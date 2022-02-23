import { Injectable } from '@angular/core';
import {Observable, of, Subject, BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import {Relation} from "../relation/relation";
import {Bbox} from "../image/bbox";
import {Item} from "../relation/drop-down-list/drop-down-list.component";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private _showInstruction: boolean = false;
  private _instructionTimeEffort: number = 0;
  private _bbox_index: number;
  private _objects : Item[] = [];
  private _relations : Item[] = [];
  private _user_object_list : Relation[] = [];
  private BBOX_DATA = new BehaviorSubject<Bbox[]>([]);
  private BBOX_TEMP = new BehaviorSubject<Bbox[]>([]);
  private RELATION_DATA = new BehaviorSubject<Relation[]>([]);
  private _INSTRUCTION_STATUS = new BehaviorSubject<boolean>(false);


  get instructionTimeEffort(): number {
    return this._instructionTimeEffort;
  }

  set instructionTimeEffort(value: number) {
    this._instructionTimeEffort = value;
  }

  get objects(): Item[] {
    return this._objects;
  }

  get relations(): Item[] {
    return this._relations;
  }

  set objects(value: Item[]) {
    this._objects = value;
  }

  set relations(value: Item[]) {
    this._relations = value;
  }


  get showInstruction(): boolean {
    return this._showInstruction;
  }


  public getInstructionStatus(): Observable<boolean> {
    return this._INSTRUCTION_STATUS.asObservable();
  }

  set showInstruction(value: boolean) {
    this._showInstruction = value;
    this._INSTRUCTION_STATUS.next(value);
  }

  get user_object_list(): Relation[] {
    return this._user_object_list;
  }

  set user_object_list(value: Relation[]) {
    this._user_object_list = value;
  }

  get bbox_index(): number {
    return this._bbox_index;
  }

  set bbox_index(value: number) {
    this._bbox_index = value;
  }

  public getRelationData(): Observable<Relation[]> {
    return this.RELATION_DATA.asObservable();
  }

  public getBboxData(): Observable<Bbox[]> {
    return this.BBOX_DATA.asObservable();
  }

  public getFinalRelations(){
    return this.RELATION_DATA.getValue();
  }

  public refreshRelations(rows: Relation[]){
    _.forEach(this.RELATION_DATA.getValue(), (item: Relation, inx) => {
      this.RELATION_DATA.getValue().splice(0, 1);
    });
    _.forEach(rows, (row: Relation, inx) => {
      this.RELATION_DATA.getValue().push(row);
    });
    this.RELATION_DATA.next(this.RELATION_DATA.getValue());
  }

  public addRelations(rows: Relation[]){
    _.forEach(rows, (row: Relation, inx) => {
      this.RELATION_DATA.getValue().push(row);
    });
    this.RELATION_DATA.next(this.RELATION_DATA.getValue());
  }

  public addRelation(row: Relation){
    this.RELATION_DATA.getValue().unshift(row);
    this.RELATION_DATA.next(this.RELATION_DATA.getValue());
  }

  public removeRelation(id) {
    _.remove(this.RELATION_DATA.getValue(), (relation: Relation) => relation.id == id);
    this.RELATION_DATA.next(this.RELATION_DATA.getValue());
  }

  public removeAll() {
    _.forEach(this.RELATION_DATA.getValue(), (item: Relation, inx) => {
      this.RELATION_DATA.getValue().splice(0, 1);
    });
    this.RELATION_DATA.next(this.RELATION_DATA.getValue());
  }

  public refresh() {
    this.RELATION_DATA.next(this.RELATION_DATA.getValue());
  }

  getLastId() {
    let max = 0;
    _.forEach(this.RELATION_DATA.getValue(), (item: Relation, inx) => {
      if (item.id > max)
        max = item.id;
    });
    return max;
  }

  public addTempBox(box: Bbox, index: number){
    if(this.BBOX_TEMP.getValue().length == 0) {
      this.BBOX_TEMP.getValue().push(box);
    }else{
      this.BBOX_TEMP.getValue()[index] = box;
    }
    this.BBOX_TEMP.next(this.BBOX_TEMP.getValue());
  }

  public getTempBoxes(): Observable<Bbox[]> {
    return this.BBOX_TEMP.asObservable();
  }

  public addBoxes(boxes: Bbox[]){
    this.BBOX_DATA.getValue().splice(0,this.BBOX_DATA.getValue().length);
    _.forEach(boxes, (box: Bbox, inx) => {
      this.BBOX_DATA.getValue().push(box);
    });
    this.BBOX_DATA.next(this.BBOX_DATA.getValue());
  }

  public removeBoxes() {
    _.forEach(this.BBOX_DATA.getValue(), (item: Bbox, inx) => {
      this.BBOX_DATA.getValue().splice(0, 1);
    });
    this.BBOX_DATA.next(this.BBOX_DATA.getValue());
  }

  reset() {
    this.BBOX_DATA = new BehaviorSubject<Bbox[]>([]);
    this.BBOX_TEMP = new BehaviorSubject<Bbox[]>([]);
    this.RELATION_DATA = new BehaviorSubject<Relation[]>([]);
  }

  resetTempBoxes(){
    this.bbox_index = 1;
    _.forEach(this.BBOX_TEMP.getValue(), (item: Bbox[], inx) => {
      this.BBOX_TEMP.getValue().splice(0, 1);
    });
    this.BBOX_TEMP.next(this.BBOX_TEMP.getValue());
  }

}
