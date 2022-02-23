import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Relation} from "../relation";
import {CommandService} from "../../services/command.service";
import {DataService} from "../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {Bbox} from "../../image/bbox";
import {MessageDialogComponent} from "../../pages/scene/message-dialog/message-dialog.component";
import {Attribute, Object, Predicate, Type} from "../add-relation/add-relation.component";
import {Item} from "../drop-down-list/drop-down-list.component";


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
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddObjectComponent implements OnInit {

  @Input('resetForm')
  resetFormFlag: number = 0;

  @Output('onGoToRelationList')
  onGoToRelationList = new EventEmitter();

  objectList: Relation[] = [];
  objectAnnotation: Relation;
  relationAnnotation: Relation;
  selectedObject1: Relation;
  selectedObject2: Relation;
  resetDropdownFlag: number = 0;
  isFirstRelation: boolean = true;
  addRelationActive: boolean = false;
  objectCounter: number = 0;
  scoreMoved: boolean = false;

  objects: Object[] = [];
  relations: Predicate[] = [];
  types: Type[] = [
    {name: 'typical'},
    {name: 'unusual'}
  ];

  constructor(private commandService: CommandService, private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.objectAnnotation = new Relation();
    this.relationAnnotation = new Relation();
    this.dataService.bbox_index = 1;
    this.objectList = this.dataService.user_object_list;

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
        this.objectAnnotation.object1Bbox = null;
      } else if (boxes.length == 1) {
        this.objects = this.dataService.objects;
        this.objectAnnotation.object1Bbox = "[" + this.encodeBoundingBox(boxes[0]) + "]";
      }
    });
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


  updateAnnotation(item, type) {
    this.objects = this.dataService.objects;
    this.relations = this.dataService.relations;

    if (type == 'obj1') {
      this.objectAnnotation.object1Label = item.name;
    }
    if (type == 'type1') {
      this.objectAnnotation.object1Type = item.name;
    }
    if (type == 'attribute1') {
      this.objectAnnotation.object1Attribute = item.name;
    }
  }

  checkForBox() {
    if (this.objectAnnotation.object1Bbox == null)
      this.showWarningMessage('Please first draw a bounding box around the object. Then choose a correct label from the dropdown list');
  }

  checkForObjects(){
    if (this.objectList.length < 2)
      this.showWarningMessage('For adding a relation, you should at least add two unique objects');
  }

  onObjectSelected() {
    this.clearObjectBbox();
    if (this.selectedObject1) {
      this.relationAnnotation.object1Label = this.selectedObject1.object1Label;
      this.relationAnnotation.object1Type = this.selectedObject1.object1Type;
      this.relationAnnotation.object1Bbox = this.selectedObject1.object1Bbox;
    }
    if (this.selectedObject2) {
      this.relationAnnotation.object2Label = this.selectedObject2.object1Label;
      this.relationAnnotation.object2Type = this.selectedObject2.object1Type;
      this.relationAnnotation.object2Bbox = this.selectedObject2.object1Bbox;
    }
    this.showObjectBbox(this.relationAnnotation);
  }

  onObjectOver(object: Relation, index){
    this.clearObjectBbox();
    let tmp = new Relation();
    if(index == 1) {
      tmp.object1Label = object.object1Label;
      tmp.object1Type = object.object1Type;
      tmp.object1Bbox = object.object1Bbox;
      tmp.object2Label = this.relationAnnotation.object2Label;
      tmp.object2Type = this.relationAnnotation.object2Type;
      tmp.object2Bbox = this.relationAnnotation.object2Bbox;
    }else if(index == 2){
      tmp.object1Label = this.relationAnnotation.object1Label;
      tmp.object1Type = this.relationAnnotation.object1Type;
      tmp.object1Bbox = this.relationAnnotation.object1Bbox;
      tmp.object2Label = object.object1Label;
      tmp.object2Type = object.object1Type;
      tmp.object2Bbox = object.object1Bbox;
    }
    this.showObjectBbox(tmp);
  }

  showObjectBbox(relation: Relation){
    let boxes: Bbox[] = [];
    if(relation.object1Label != null) {
      let bbox = relation.object1Bbox.replace('[', '').replace(']', '').split(',');
      let box1 = new Bbox(relation.object1Label, '#197FE1', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
      boxes.push(box1);
    }
    if(relation.object2Label != null) {
      let bbox = relation.object2Bbox.replace('[', '').replace(']', '').split(',');
      let box2 = new Bbox(relation.object2Label, '#E10001', +bbox[0], +bbox[1], +bbox[2], +bbox[3]);
      boxes.push(box2);
    }
    this.dataService.addBoxes(boxes);
  }


  clearObjectBbox() {
    this.dataService.removeBoxes();
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

  addObject(){
    this.objectAnnotation.id = Math.floor(100000 + Math.random() * 900000);
    this.objectAnnotation.isAnnotated = false;
    this.objectAnnotation.valid = null;
    this.objectAnnotation.isEdited = true;
    this.objectAnnotation.isNewRelation = true;
    this.dataService.addRelation(this.objectAnnotation);
    this.dataService.user_object_list.push(this.objectAnnotation);
    this.resetObject();
    this.objectCounter += 1;
  }

  addRelation(){
    this.relationAnnotation.id = Math.floor(100000 + Math.random() * 900000);
    this.relationAnnotation.isAnnotated = false;
    this.relationAnnotation.valid = null;
    this.relationAnnotation.isEdited = true;
    this.relationAnnotation.isChosen = false;
    this.relationAnnotation.isNewRelation = true;
    this.dataService.addRelation(this.relationAnnotation);
    this.resetRelation();
  }

  resetObject(){
    this.resetDropdownFlag += 1;
    this.objectAnnotation = new Relation();
    this.dataService.resetTempBoxes();
    this.dataService.bbox_index = 1;
  }

  resetRelation(){
    this.resetDropdownFlag += 1;
    this.relationAnnotation = new Relation();
    this.selectedObject1 = null;
    this.selectedObject2 = null;
    this.dataService.resetTempBoxes();
  }
}
