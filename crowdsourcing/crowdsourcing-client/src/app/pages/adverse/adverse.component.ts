import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Relation} from "../../relation/relation";
import {Bbox} from "../../image/bbox";
import * as _ from "lodash";
import {InfoDialogComponent} from "../../table/info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {TimeService} from "../../services/time.service";
import {MessageDialogComponent} from "../scene/message-dialog/message-dialog.component";
import {StatisticsComponent} from "./statistics/statistics.component";

@Component({
  selector: 'app-adverse',
  templateUrl: './adverse.component.html',
  styleUrls: ['./adverse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdverseComponent implements OnInit {

  taskId: number = 0;
  sessionId: string;
  studyId: string;
  pid: string;
  submissionId: string;
  instructionTimeEffort: number;
  width: number;
  breakpoint: number;
  addNewRelationActive: boolean;
  activateAddRelation: boolean = false;
  activeBboxDrawing = false;
  selectedDataTabIndex: number = 0;
  selectedImageTabIndex: number = 0;
  isSceneAvailable: boolean;
  isImageLoaded: boolean = false;
  showError: boolean = false;
  isTypical: boolean;
  isWrongLabel: boolean;
  reason: any;
  reason2: any;
  sceneImage: any;
  similars:any;
  randoms:any;
  predictedImage: any;
  sceneCategory: any;
  predictedCategory: any;
  weight: number;
  sceneGraph: Relation[];
  boxes: Bbox[];
  currentTab: any = 'table';
  selectedType: any;
  selectedLabelValidity: any;
  statistics: any;
  total:any;
  mustLoad: boolean;
  tiles: any[] = [
    {text: 'image', cols: 1, rows: 1, color: 'white'},
    {text: 'graph', cols: 1, rows: 1, color: '#a3a3a3'}
  ];
  @ViewChild('parentElement', {static: true}) imageContainerParent;
  private subscriptions: Subscription[] = [];

  imageURL = environment.baseURL + '/' + environment.context + '/image/';

  constructor(private router: Router, private commandService: CommandService, private dataService: DataService,
              private command: CommandService, public dialog: MatDialog, private route: ActivatedRoute, private time: TimeService) {
    this.route.queryParams.subscribe(params => {
      if (params['t'] && (params['t'] == 1 || params['t'] == 2))
        this.taskId = params['t'];

      if (params['p_id'] && params['p_id'] != '')
        this.pid = params['p_id'];

      if (params['st_id'] && params['st_id'] != '')
        this.studyId = params['st_id'];

      if (params['session_id'] && params['session_id'] != '')
        this.sessionId = params['session_id'];

      if(this.pid != null) {
        if (params['cc'] && params['cc'] != '')
          this.submissionId = params['cc'];
    //    else
      //    alert("The url is not valid! make sure you are using a correct URL.")
      }
    });
  }

  ngOnInit() {
    this.adjustLayout(window.innerWidth);
    this.dataService.reset();
    this.width = this.imageContainerParent.nativeElement.clientWidth;
    this.loadScene();
    this.loadMetadata();
  }

  onRadioChange() {
    if (this.selectedType)
      this.isTypical = (this.selectedType == 1);
  }

  onRadioChange2() {
    if (this.selectedLabelValidity) {
      this.isWrongLabel = (this.selectedLabelValidity == 1);
      this.reason = null;
      this.selectedType = null;
    }
  }

  onSliderChange(event) {
    this.selectedType = event.value;
  }

  onResize(event) {
    this.adjustLayout(event.target.innerWidth);
  }

  adjustLayout(innerWidth){
    this.breakpoint = (innerWidth < 1000) ? 1 : 2;
    if(this.breakpoint == 1){
      this.tiles[0].cols = 1;
    }else{
      this.tiles[0].cols = 1;
    }
  }

  loadMetadata() {
    this.command.execute('evaluation/get/metadata', 'GET', 'json', {}, true).subscribe((metadata) => {
      this.statistics = metadata;
    }, (error => {
      console.error(error);
    }));
  }


  loadScene() {
    let sid = (this.sessionId == null) ? 'no_session' : this.sessionId;
    this.command.execute('scene/get/' + sid, 'GET', 'json', {}, true).subscribe((scene) => {
      if (scene.counter && scene.counter >= 10) {
        this.showFinishMessage();
      } else {
        this.mustLoad = false;
        this.similars = [];
        this.randoms = [];
        this.sceneImage = scene['image'];
        this.similars = scene['similars'];
        this.randoms = scene['randoms'];
        this.total = scene['total'];
        this.predictedImage = 'ppp_' + scene['image'];
        this.sceneCategory = scene['category'];
        this.predictedCategory = scene['prediction'];
        this.weight = scene['weight'];
        this.dataService.addRelations(scene['graph']);
        if (this.taskId == 0)
          this.taskId = scene['task_id'];
        if (this.taskId == 2) {
          this.selectedImageTabIndex = 1;
          this.activeBboxDrawing = false;
        }
        this.isSceneAvailable = true;
        this.isImageLoaded = true;
        this.showError = false;
        // this.showStartedMessage();
      }
    }, (error => {
      console.error(error);
      this.isSceneAvailable = false;
      this.showError = true;
    }));
  }





  onTableSelected(relation: Relation) {
    let boxes: Bbox[] = [];
    if (relation == null) {
      this.dataService.removeBoxes();
    } else {
      if (relation.object1Bbox != null) {
        let bbox = relation.object1Bbox.replace('[', '').replace(']', '').split(',');
        let box1 = new Bbox(relation.object1Label, '#197FE1', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
        boxes.push(box1);
      }
      if (relation.object2Bbox != null) {
        let bbox = relation.object2Bbox.replace('[', '').replace(']', '').split(',');
        let box2 = new Bbox(relation.object2Label, '#E10001', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
        boxes.push(box2);
      }
      this.dataService.addBoxes(boxes);
    }
  }


  onGraphSelected(relation: Relation){
    let boxes: Bbox[] = [];
    if(relation == null){
      this.dataService.removeBoxes();
    }else{
      if(relation.object1Bbox) {
        let bbox = relation.object1Bbox.replace('[', '').replace(']', '').split(',');
        let box1 = new Bbox(relation.object1Label, '#197FE1', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
        boxes.push(box1);
      }
      if(relation.object2Bbox) {
        let bbox = relation.object2Bbox.replace('[', '').replace(']', '').split(',');
        let box2 = new Bbox(relation.object2Label, '#E10001', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
        boxes.push(box2);
      }
      this.dataService.addBoxes(boxes);
    }
  }

  addNewRelation(){
    this.selectedDataTabIndex = 1;
  }

  onTabIndexChange(index) {
    if(this.taskId == 1){
      this.activeBboxDrawing = true;
    }else {
      if (index == 1) {
        this.dataService.resetTempBoxes();
        this.activeBboxDrawing = false;
        this.selectedDataTabIndex = 1;
      } else {
        this.activeBboxDrawing = true;
        this.selectedDataTabIndex = 0;
      }
    }
  }

  onAllRowsAnnotated() {
    // if(!this.activateAddRelation) {
    this.activateAddRelation = true;
    this.submit(false);
    // }
  }

  openInfoWindow() {
    const dialogRef = this.dialog.open(StatisticsComponent, {
      width: '30%',
      data: this.statistics
    });
    return dialogRef;
  }

  extractDistinctObjects() {
    let objects = [];
    let relations = this.dataService.getFinalRelations();
    relations.forEach(relation => {

      let obj1 = relation.object1Label;
      if (obj1 && obj1.indexOf('_') > -1) {
        obj1 = obj1.substring(obj1.indexOf('_') + 1, obj1.length)
      }
      if (objects.indexOf(obj1) == -1) {
        objects.push(obj1);
      }

      let obj2 = relation.object2Label;
      if (obj2 && obj2.indexOf('_') > -1) {
        obj2 = obj2.substring(obj2.indexOf('_') + 1, obj2.length)
      }
      if (objects.indexOf(obj2) == -1) {
        objects.push(obj2);
      }

    });
    return objects;
  }

  checkForMinimalSet(){
    let relations = this.dataService.getFinalRelations();
    let counter = _.filter(relations, (relation: Relation) => { return relation.isChosen; });
    return (counter != null && counter.length > 0);
  }

  checkForMinCorrectRelations(){
    let relations = this.dataService.getFinalRelations();
    let counter = _.filter(relations, (relation: Relation) => { return relation.valid; });
    return (counter != null && counter.length > 0);
  }

  checkForEvaluatedRelations(){
    let relations = this.dataService.getFinalRelations();
    let counter = _.filter(relations, (relation: Relation) => { return !relation.isAnnotated; });
    return (counter == null || counter.length == 0);
  }

  checkForMinObjects(){
    let relations = this.dataService.getFinalRelations();
    let counter = _.filter(relations, (relation: Relation) => { return !_.isUndefined(relation.isAnnotated); });
    return (counter != null && counter.length > 1);
  }

  checkForMinimumAnnotated(){
    let relations = this.dataService.getFinalRelations();
    let counter = _.filter(relations, (relation: Relation) => { return relation.isNewRelation && ( !relation.isAnnotated); });
    return (counter == null || counter.length == 0);
  }

  submit(isClicked) {

  }

  showFinishMessage() {
    let message = 'Thanks for your input. Press FINISH to proceed...';
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      autoFocus: false,
      data: {
        success: true,
        message: message
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      window.location.href = 'https://app.prolific.co/submissions/complete?cc=' + this.submissionId;
      //this.reset();
    });
  }

  sendData(){

    let data = {};
    data['label'] = this.sceneCategory;
    data['atypical'] = this.selectedType;
    data['wrongLabel'] = this.selectedLabelValidity;
    data['reason'] = this.reason;
    data['reason2'] = this.reason2;
    data['imageName'] = this.sceneImage;

    if(window && window.innerWidth)
      data['width'] = window.innerWidth;
    if(window && window.innerHeight)
      data['height'] = window.innerHeight;

    if(this.pid)
      data['pid'] = this.pid;
    if(this.studyId)
      data['studyId'] = this.studyId;
    if(this.sessionId)
      data['sid'] = this.sessionId;
    data['elapsedTime'] =  Number(this.time.getTimeOnPage());
    data['instructionTimeEffort'] =  this.instructionTimeEffort;

    this.command.execute('evaluation/save', 'POST', 'json', data, true).subscribe(() => {
      //this.showFinishMessage();
      this.reset();
    }, (error => {
      alert(error['error']);
    }));
  }

  activateAddRelationMode(){
    this.activeBboxDrawing = true;
    this.addNewRelationActive = true;
    this.selectedDataTabIndex = 1;

  }

  reset() {
    this.similars = [];
    this.randoms = [];
    this.reason = null;
    this.reason2 = null;
    this.selectedLabelValidity = null;
    this.selectedType = null;
    this.isTypical = null;
    this.isWrongLabel = null;
    this.taskId = null;
    this.width = null;
    this.breakpoint = null;
    this.selectedDataTabIndex = 0;
    this.selectedImageTabIndex = 0;
    this.isSceneAvailable = false;
    this.isImageLoaded = false;
    this.sceneImage = null;
    this.predictedImage = null;
    this.sceneCategory = null;
    this.predictedCategory = null;
    this.weight = null;
    this.sceneGraph = [];
    this.boxes = [];
    this.currentTab = 'table';
    this.addNewRelationActive = false;
    this.route.queryParams.subscribe(params => {
      if (params['t'] && (params['t'] == 1 || params['t'] == 2))
        this.taskId = params['t'];
    });
    this.ngOnInit();
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
