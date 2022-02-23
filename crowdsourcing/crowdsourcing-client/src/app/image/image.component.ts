import {Component, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {environment} from '../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import {DataService} from '../services/data.service';
import * as _ from 'lodash';
import {Bbox} from './bbox';
import {CommandService} from '../services/command.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TimeService} from '../services/time.service';
import {UserService} from '../services/user.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageComponent implements OnInit {

  drag = false;
  startX: number = null;
  startY: number = null;
  baseImage = new Image();
  drawingImage = new Image();
  currentBbox: Bbox = null;
  drawingContext: CanvasRenderingContext2D = null;
  xScale: number = 1;
  yScale: number = 1;
  drawnBoxes: number = 0;

  @Input('width') width: number;
  @Input('current-image') currentImageId: any;
  @Input('active-annotation') activeAnnotation: boolean;
  @Input('next-row') next: number;
  @Input('evaluation-mode') evaluationMode: boolean;
  @Output('onAnnotationModeChanged') onAnnotationModeChanged = new EventEmitter();
  @Output('onImageLoaded') onImageLoaded = new EventEmitter();
  @ViewChild('wrapper', {static: true}) wrapper;
  @ViewChild('imageContainer', {static: true}) myCanvas;

  private subscriptions: Subscription[] = [];


  constructor(public dialog: MatDialog, private dataService: DataService) {

  }

  ngOnInit() {
    this.load();
    this.subscriptions.push(this.dataService.getBboxData().subscribe(this.onBboxChanged.bind(this)));
    this.subscriptions.push(this.dataService.getTempBoxes().subscribe(this.onTempBboxChanged.bind(this)));
  }


  onBboxChanged(data: Bbox[]){
    this.drawRelation(data);
  }

  onTempBboxChanged(data: Bbox[]){
    if(data.length == 0){
      this.erase();
    }
  }

  load() {
    let url = environment.baseURL + '/' + environment.context + '/image/' + this.currentImageId;
    this.baseImage.src = url;
    this.drawingImage = _.cloneDeep(this.baseImage);
    this.baseImage.onload = () => {
      let context = this.myCanvas.nativeElement.getContext('2d');
      let w = this.baseImage.width;
      let h = this.baseImage.height;
      if(w > this.wrapper.nativeElement.clientWidth) {
        let ratio = w / h;
        w = this.wrapper.nativeElement.clientWidth;
        h = w / ratio;
      }
      this.getSize(w,h);
      context.canvas.width = w;
      context.canvas.height = h;
      this.render(context, this.baseImage, context.canvas.width, context.canvas.height);
    };
  }

  getSize(w:number, h:number) {
    let minSize = 600
    let maxSize = 1000
    let size = minSize;
    if (maxSize) {
      let minOriginalSize = Math.min(w, h);
      let maxOriginalSize = Math.min(w, h);
      if ((maxOriginalSize / minOriginalSize) * size > maxSize)
        size = Math.round(maxSize * minOriginalSize / maxOriginalSize);
    }

    if ((w <= h && w == size) || (h <= w && h == size)) {
      this.xScale = 1;
      this.yScale = 1;
      return;
    }

    if (w < h) {
      let ow = size;
      let oh = (size * h / w);
      this.xScale = ow / w;
      this.yScale = oh / h;
    } else {
      let oh = size;
      let ow = size * w / h;
      this.xScale = ow / w;
      this.yScale = oh / h;
    }
    return;
  }

  mouseDownEvent(e) {
    if (this.activeAnnotation) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.drag = true;
      if(this.drawingContext == null)
        this.drawingContext = this.myCanvas.nativeElement.getContext('2d');
    }
  }

  mouseMoveEvent(e) {
    if (this.activeAnnotation && this.drag) {
      const sx = this.startX;
      const sy = this.startY;

      const canvasTop = this.myCanvas.nativeElement.getBoundingClientRect().top;
      const canvasLeft = this.myCanvas.nativeElement.getBoundingClientRect().left;
      const canvasWidth = this.myCanvas.nativeElement.getBoundingClientRect().width;
      const canvasHeight = this.myCanvas.nativeElement.getBoundingClientRect().height;
      this.render(this.drawingContext, this.baseImage, canvasWidth, canvasHeight);

      const x = sx - canvasLeft;
      const y = sy - canvasTop;
      const w = e.clientX - canvasLeft - x;
      const h = e.clientY - canvasTop - y;
      let color = (this.dataService.bbox_index == 1) ? '#197FE1' : 'red';
      this.draw(this.drawingContext, x, y, w, h, color);
      this.currentBbox = new Bbox('','',y * this.yScale, x * this.xScale, (y + h) * this.yScale, (x + w) * this.xScale);
    }
  }

  mouseUpEvent(e) {
    if (this.activeAnnotation) {
      this.drag = false;
      this.drawingContext = null;
      this.drawnBoxes = (this.dataService.bbox_index == 1) ? 1 : 2;
      this.dataService.addTempBox(this.currentBbox, this.drawnBoxes - 1);
    }
  }

  erase() {
      let context = this.myCanvas.nativeElement.getContext('2d');
      const canvasWidth = this.myCanvas.nativeElement.getBoundingClientRect().width;
      const canvasHeight = this.myCanvas.nativeElement.getBoundingClientRect().height;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      this.render(context, this.baseImage, canvasWidth, canvasHeight);
      this.drawnBoxes = 0;
  }

  draw(context, x, y, w, h, color): CanvasRenderingContext2D {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 4;
    context.rect(x, y, w, h);
    context.stroke();
    return context;
  }

  render(context, baseImage, canvasWidth, canvasHeight) {
    let scale = Math.min(context.canvas.width / baseImage.width, context.canvas.height / baseImage.height);
    let x = (context.canvas.width / 2) - (baseImage.width / 2) * scale;
    let y = (context.canvas.height / 2) - (baseImage.height / 2) * scale;
    context.drawImage(baseImage, x, y, baseImage.width * scale, baseImage.height * scale);
  }


  drawRelation(boxes: Bbox[]) {
    if (boxes == null || boxes.length == 0) {
      this.erase();
    } else {
      let box: Bbox;
      this.drawingContext = this.myCanvas.nativeElement.getContext('2d');
      //   this.render(this.drawingContext, this.baseImage, this.baseImage.width, this.baseImage.height);
      for (let i = 0; i < boxes.length; i++) {
        box = boxes[i];
        const x = box.left;
        const y = box.top;
        const w = box.right - x;
        const h = box.bottom - y;
        this.draw(this.drawingContext, x / this.xScale, y / this.yScale, w / this.xScale, h / this.yScale, box.color);
      }
      this.drawingContext = null;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
