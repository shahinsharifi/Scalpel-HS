import {
  Component,
  EventEmitter, Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Relation} from "../relation/relation";
import {DataService} from "../services/data.service";
import {Subscription} from "rxjs";
import * as _ from "lodash";
import {MatListItem} from "@angular/material/list";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "./info-dialog/info-dialog.component";
import {JudgeDialogComponent} from "./judge-dialog/judge-dialog.component";
import {ReasonDialogComponent} from "./reason-dialog/reason-dialog.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit{


  @Input('read-only')
  readonly : boolean;

  @Input('taskID')
  taskID: number;

  @Input('sceneCategory')
  sceneCategory: string;

  @Input('addNewRelationActive')
  addNewRelationActive: boolean;

  relations: Relation[];
  tmpRelations: Relation[] = [];

  @Output('onRowSelected') onRowSelected = new EventEmitter();
  @Output('onAllRowsAnnotated') onAllRowsAnnotated = new EventEmitter();

  @ViewChildren("relationTable") relationTable: QueryList<MatListItem>;

  editActivate: boolean = false;


  importanceTooltip: String[] = ['Please rate the importance of this relation.','Not Important - Very Important'];
  deleteTooltip: String[] = ['Delete relation'];
  editTooltip: String[] = ['Edit relation'];

  subscriptions: Subscription[] = [];

  constructor(private dataService: DataService, public dialog: MatDialog){

  }

  ngOnInit() {
    this.subscriptions.push(this.dataService.getRelationData().subscribe(this.onRelationAdded.bind(this)));
  }

  onRelationAdded(relations) {
    this.relations = relations;
    if (!this.readonly) {
      let isEditingSet = false;
      if (this.taskID == 1) {
        if (!this.addNewRelationActive) {
          _.forEach(this.relations, (relation: Relation, inx) => {
            if (!isEditingSet && !relation.isAnnotated) {
              relation.isEdited = true;
              isEditingSet = true;
              this.tmpRelations.push(this.relations[inx]);
            }
          });
        } else {
          this.tmpRelations = _.orderBy(relations, [(relation: Relation) => {
            return relation.weight;
          }], ['desc']);
          this.editActivate = true;
        }
      } else
        this.tmpRelations = _.orderBy(relations, [(relation: Relation) => {
          return relation.weight;
        }], ['desc']);
    } else {
      if (this.taskID == 1) {
        this.relations = _.orderBy(relations, [(relation: Relation) => {
          return relation.weight;
        }], ['desc']);
      }else{
        relations = _.filter(relations, (relation: Relation) => {
          return relation.isAnnotated;
        });
        this.relations = _.orderBy(relations, [(relation: Relation) => {
          return relation.weight;
        }], ['desc']);
      }
    }
  }

  onMouseEnter(relation){
    this.onRowSelected.emit(relation);
  }

  onMouseLeave(){
    this.onRowSelected.emit(null);
  }

  edit(relation:Relation) {
    _.forEach(this.relations, (rel: Relation) => {
      if (rel.id == relation.id) {
        rel.isAnnotated = false;
      } else {
        rel.isAnnotated = true;
      }
    });
  }

  delete(relation: Relation){
    this.dataService.resetTempBoxes();
    this.dataService.removeRelation(relation.id)
  }

  annotate(relation: Relation, isValid) {
    if (isValid) {
      relation.sceneCategory = this.sceneCategory;
      let dialog = this.openInfoWindow(relation);
      dialog.afterClosed().subscribe(result => {
        if (result && result != '') {
          relation.isAnnotated = true;
          relation.valid = isValid;
          this.updateCurrentRelation();
        }
      });
    } else {
      relation.isChosen = false;
      relation.isAnnotated = true;
      relation.valid = isValid;
      relation.weight = 0;
      this.updateCurrentRelation();
    }
  }

  judge(relation: Relation){
    let dialog = this.openJudgeWindow(relation);
    dialog.afterClosed().subscribe(result => {
      if (result && result != '') {
        relation.isAnnotated = true;
      }
    });
  }


  showReason(relation: Relation) {
    const dialogRef = this.dialog.open(ReasonDialogComponent, {
      width: '80%',
      data: {
        isTypical: relation.isTypical,
        reason: relation.reason,
        taskId: this.taskID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openInfoWindow(relation: Relation) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '80%',
      height: '400px',
      data: relation
    });
    return dialogRef;
  }


  openJudgeWindow(relation: Relation) {
    relation.sceneCategory = this.sceneCategory;
    const dialogRef = this.dialog.open(JudgeDialogComponent, {
      width: '80%',
      data: relation
    });
    return dialogRef;
  }


  updateCurrentRelation() {
    let relations = this.dataService.getFinalRelations();
    this.relations = relations;
    this.tmpRelations = _.orderBy(this.tmpRelations, [(relation: Relation) => { return relation.weight; }], ['desc']);
    let index = _.findIndex(this.relations, (relation: Relation) => {
      return !relation.isEdited && !relation.isAnnotated;
    });
    if (index != -1) {
      this.relations[index].isEdited = true;
      this.tmpRelations.unshift(this.relations[index]);
    } else {
      this.editActivate = true;
      this.onAllRowsAnnotated.emit(true);
      console.log('end of list');
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}




