import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from "../drop-down-list/drop-down-list.component";
import {DataService} from "../../services/data.service";
import {CommandService} from "../../services/command.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Relation} from "../relation";
import {Bbox} from "../../image/bbox";
import {MessageDialogComponent} from "../../pages/scene/message-dialog/message-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface Object extends Item{
  name: string;
}

export interface Predicate extends Item{
  name: string;
}

export interface Attribute extends Item{
  name: string;
}

export interface Type extends Item{
  name: string;
}

@Component({
  selector: 'app-add-relation',
  templateUrl: './add-relation.component.html',
  styleUrls: ['./add-relation.component.scss']
})
export class AddRelationComponent implements OnInit {

  objects: Object[] = [];
  relations: Predicate[] = [];
  attributes: Attribute[] = [
    {name: 'yellow'},
    {name: 'red'},
    {name: 'blue'}
  ];
  types: Type[] = [
    {name: 'typical'},
    {name: 'unusual'}
  ];

  annotation: Relation;

  @Input('resetForm')
  resetFormFlag: number = 0;

  @Output('onGoToRelationList')
  onGoToRelationList = new EventEmitter();

  resetDropdownFlag: number = 0;

  isFirstRelation: boolean = true;

  tooltip: String[] = ['Please rate the importance of this relation.','Not Important - Very Important'];

  scoreMoved: boolean = false;



  constructor(private commandService: CommandService, private dataService: DataService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.annotation = new Relation();
    if (this.dataService.objects.length == 0 || this.dataService.relations.length == 0) {
      this.commandService.execute('scene/get/metadata', 'GET', 'json', {}, true).subscribe((metadata) => {
        this.dataService.objects = metadata['objects'];
        this.dataService.relations = metadata['relations'];
      }, (error => {
        console.error(error);
      }));
    } else {
      this.objects = this.dataService.objects;
      this.relations = this.dataService.relations;
    }
    this.dataService.getTempBoxes().subscribe((boxes) => {
      if (boxes.length == 0) {
        this.annotation.object1Bbox = null;
        this.annotation.object2Bbox = null;
      } else if (boxes.length == 1) {
        this.objects = this.dataService.objects;
        this.relations = this.dataService.relations;
        this.annotation.object1Bbox = "[" + this.encodeBoundingBox(boxes[0]) + "]";
        this.annotation.object2Bbox = null;
      } else if (boxes.length == 2) {
        this.objects = this.dataService.objects;
        this.relations = this.dataService.relations;
        this.annotation.object1Bbox = "[" + this.encodeBoundingBox(boxes[0]) + "]";
        this.annotation.object2Bbox = "[" + this.encodeBoundingBox(boxes[1]) + "]";
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resetFormFlag)
      this.reset();
  }

  encodeBoundingBox(bbox: Bbox){
    let encodedBbox = [
      bbox.top,
      bbox.left,
      bbox.bottom,
      bbox.right
    ].toString();
    return encodedBbox;
  }


  updateAnnotation(item, type){
    this.objects = this.dataService.objects;
    this.relations = this.dataService.relations;

    if(type == 'obj1'){
      this.annotation.object1Label = item.name;
    }
    if(type == 'type1'){
      this.annotation.object1Type = item.name;
    }
    if(type == 'attribute1'){
      this.annotation.object1Attribute = item.name;
    }
    if(type == 'rel'){
      this.annotation.relationLabel = item.name;
      if(this.annotation.relationLabel)
        this.dataService.bbox_index = 2;
      else
        this.dataService.bbox_index = 1;
    }
    if(type == 'obj2'){
      this.annotation.object2Label = item.name;
    }
    if(type == 'type2'){
      this.annotation.object2Type = item.name;
    }
    if(type == 'attribute2'){
      this.annotation.object2Attribute = item.name;
    }
  }

  checkForBox(index) {
    if (index == 1) {
      if (this.annotation.object1Bbox == null)
        this.showWarningMessage('Please first draw a bounding box around the object 1. Then choose a correct label from the dropdown list');
    } else if (index == 2) {
      if (this.annotation.object2Bbox == null)
        this.showWarningMessage('Please first draw a bounding box around the object 2. Then choose a correct label from the dropdown list');
    }
  }

  showWarningMessage(message) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        isWarning: true,
        message: message
      }
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  onScoreChanged(){
    this.scoreMoved = true;
  }

  add(){
    this.annotation.id = Math.floor(100000 + Math.random() * 900000);
    this.annotation.isAnnotated = true;
    this.annotation.valid = true;
    this.annotation.isEdited = true;
    this.annotation.isChosen = true;
    this.annotation.isNewRelation = true;
    this.dataService.addRelation(this.annotation);
    this.reset();
    this.isFirstRelation = false;
  }

  goToRelationList(){
    this.onGoToRelationList.emit(true);
  }

  reset(){
    this.resetDropdownFlag += 1;
    this.scoreMoved = false;
    this.objects = [];
    this.relations = [];
    this.annotation = new Relation();
    this.dataService.resetTempBoxes();
  }

}
