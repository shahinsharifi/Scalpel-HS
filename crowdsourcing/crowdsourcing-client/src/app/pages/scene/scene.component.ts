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
import {MessageDialogComponent, SceneData} from "./message-dialog/message-dialog.component";
import {Subscription} from "rxjs";
import {TimeService} from "../../services/time.service";
import {query} from "@angular/animations";

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SceneComponent implements OnInit {
  query: string = null;
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
  sceneImage: any;
  predictedImage: any;
  sceneCategory: any;
  predictedCategory: any;
  weight: number;
  sceneGraph: Relation[];
  boxes: Bbox[];
  currentTab: any = 'table';
  tiles: any[] = [
    {text: 'image', cols: 1, rows: 1, color: 'white'},
    {text: 'graph', cols: 1, rows: 1, color: '#a3a3a3'}
  ];
  @ViewChild('parentElement', {static: true}) imageContainerParent;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private commandService: CommandService, private dataService: DataService,
              private command: CommandService, public dialog: MatDialog, private route: ActivatedRoute, private time: TimeService) {
    this.subscriptions.push(this.dataService.getInstructionStatus().subscribe(this.showStartedMessage.bind(this)));
    this.route.queryParams.subscribe(params => {
      if (params['t'] && (params['t'] == 1 || params['t'] == 2))
        this.taskId = params['t'];

      if (params['p_id'] && params['p_id'] != '')
        this.pid = params['p_id'];

      if (params['st_id'] && params['st_id'] != '')
        this.studyId = params['st_id'];

      if (params['session_id'] && params['session_id'] != '')
        this.sessionId = params['session_id'];

      if (params['cc'] && params['cc'] != '')
        this.submissionId = params['cc'];
    //  else
      //  alert("The url is not valid! make sure you are using a correct URL.")
      if (params['q'] && params['q'] != '')
        this.query = params['q'];

    });
  }

  ngOnInit() {
    this.adjustLayout(window.innerWidth);
    this.dataService.reset();
    this.width = this.imageContainerParent.nativeElement.clientWidth;
    this.loadScene();
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
    this.command.execute('scene/get/metadata', 'GET', 'json', {}, true).subscribe((metadata) => {
      this.dataService.objects = metadata['objects'];
      this.dataService.relations = metadata['relations'];
    }, (error => {
      console.error(error);
    }));
  }


  loadScene() {
    let command = 'scene/get';
    if(this.query)
      command += '/' + this.query;
    this.command.execute(command, 'GET', 'json', {}, true).subscribe((scene) => {
      this.sceneImage = scene['image'];
      this.predictedImage = 'ppp_' + scene['image'];
      this.sceneCategory = scene['category'];
      this.predictedCategory = scene['prediction'];
      this.weight = scene['weight'];
      this.dataService.addRelations(scene['graph']);
      if(this.taskId == 0)
        this.taskId = scene['task_id'];
      if(this.taskId == 2) {
        this.selectedImageTabIndex = 1;
        this.activeBboxDrawing = true;
      }
      this.isSceneAvailable = true;
      this.isImageLoaded = true;
      this.showError = false;
     // this.showStartedMessage();
    }, (error => {
      console.error(error);
      this.isSceneAvailable = false;
      this.showError = true;
    }));
  }

  showStartedMessage(status) {
    if(status) {
      this.instructionTimeEffort = this.dataService.instructionTimeEffort;
      this.time.init();
      let message = 'Please go through the entire list and evaluate all relationships using Wrong/Correct buttons';
      let label = null;
      if (this.taskId == 2) {
        message = 'Please identify corresponding objects and relations that are highlighted in the image (hot areas). Then, specify whether those objects (and relations) are relevant to identify the image label ';
        label = this.sceneCategory;
      }
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          isWarning: true,
          message: message,
          label: label
        }
      });
      dialogRef.afterClosed().subscribe((time) => {
        console.log('task started...');
      });
    }
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
     // window.location.href = 'https://app.prolific.co/submissions/complete?cc=' + this.submissionId;
      this.reset();
    });
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

  openInfoWindow(relation: Relation) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '70%',
      height: '400px',
      data: relation
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
    if (this.taskId == 1) {
      this.selectedDataTabIndex = 0;
      let hasMinSet = this.checkForMinimalSet();
      let hasAllEvaluated = this.checkForEvaluatedRelations();
      let skipEnabled = this.checkForMinCorrectRelations();

      let data = {};
      if (!hasAllEvaluated) {
        data = {
          isWarning: true,
          message: 'Please go through the entire list and evaluate all relationships using Wrong/Correct buttons',
          label: this.sceneCategory
        };
      }else if (!hasMinSet) {
        if (this.activateAddRelation) {
          data = {
            isWarning: true,
            message: "Please use the 'ADD RELATION' button to add a set of new relation(s) by which you recognize the image as a ",
            label: this.sceneCategory,
            activeAddRelation: this.activateAddRelation,
            skipEnabled: skipEnabled
          };
        } else {
          data = {
            isWarning: true,
            message: 'Please use checkboxes to select the minimal set of relations that are sufficient to identify the correct image label ',
            isMinimumSet: true,
            label: this.sceneCategory
          };
        }
      }else if(isClicked){
        let objects = this.extractDistinctObjects();
        data = {
          message: 'Please choose all objects which are exclusively relevant to ',
          label: this.sceneCategory,
          objectSelectionEnabled: true,
          objects: objects
        };
      }else
        return;

      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: data,
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe((result: SceneData) => {
        console.log(result);
        if (result != null) {
          if ((!result.addNewRelation && result.isWrongLabel) || result.isSuccess) {
            let relations = this.dataService.getFinalRelations();
            let data = {};
            data['sceneAnnotation'] = result;
            data['annotations'] = relations;
            data['objects'] = result.objectList;
            data['taskID'] = this.taskId;
            this.sendData(data);
          } else if(result.addNewRelation){
            this.activateAddRelationMode();
          }else if(result.isSkip){
            this.activateAddRelation = false;
            this.submit(false);
          }
        }
      });

    } else {

      let hasMinObj = this.checkForMinObjects();
      let hasMinSet = this.checkForMinimumAnnotated();
      let message = '', category = this.sceneCategory;
      if (!hasMinObj) {
        message = 'Please identify ALL corresponding objects and relations that intersect with hot areas (yellow to red) in the image. Then, specify whether those objects (and relations) are relevant to identify the image label ';
      } else if (!hasMinSet) {
        message = "Please go through the list of 'Objects/Relations' and evaluate all items by pressing the 'Judge' button ";
      }
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          isWarning: (!hasMinSet || !hasMinObj),
          message: message,
          label: category,
          sceneInfoEnabled: true
        }
      });
      dialogRef.afterClosed().subscribe(result => {

        if (result && result != '') {
          let relations = this.dataService.getFinalRelations();
          let data = {};
          data['sceneAnnotation'] = result;
          data['annotations'] = relations;
          data['taskID'] = this.taskId;
          this.sendData(data);
        }else if(!hasMinSet && hasMinObj){
          this.selectedDataTabIndex = 1;
        }
      });
    }
  }

  sendData(data){

    if(window && window.innerWidth)
      data['width'] = window.innerWidth;
    if(window && window.innerHeight)
      data['height'] = window.innerHeight;

    if(this.pid)
      data['pid'] = this.pid;
    if(this.studyId)
      data['studyId'] = this.studyId;
    if(this.sessionId)
      data['sessionId'] = this.sessionId;
    data['elapsedTime'] =  Number(this.time.getTimeOnPage());
    data['instructionTimeEffort'] =  this.instructionTimeEffort;

    this.command.execute('scene/save', 'POST', 'json', data, true).subscribe(() => {
      this.showFinishMessage();
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
