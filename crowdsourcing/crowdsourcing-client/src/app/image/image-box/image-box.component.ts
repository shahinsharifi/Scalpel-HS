import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.scss']
})
export class ImageBoxComponent implements OnInit {

  @Input('image-id') imageId: any;

  constructor() { }

  ngOnInit() {
  }

}
