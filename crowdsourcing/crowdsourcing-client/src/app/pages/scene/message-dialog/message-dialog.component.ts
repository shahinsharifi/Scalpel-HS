import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../../../dialog/dialog.component";
import {Relation} from "../../../relation/relation";
import {FormControl} from "@angular/forms";

export interface DialogData {
  success: string;
  sceneInfoEnabled: boolean;
  objectSelectionEnabled: boolean;
  objects: string[];
  isWarning: string;
  message: string;
  label: string;
  activeAddRelation: boolean;
  skipEnabled: boolean;
  isMinimumSet: boolean;
}

export interface SceneData {
  isTypical: boolean;
  reason: String;
  isNoRelation: boolean;
  isWrongLabel: boolean;
  addNewRelation: boolean;
  isSkip: boolean;
  isSuccess: boolean;
  objectList: string[];
}


@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageDialogComponent implements OnInit {

  response: string;
  sceneData: SceneData;
  selectedType: any;
  selectedLabelStatus: any;
  objectList: string[] = [];
  objectCtrl = new FormControl();

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.sceneData = {
      isTypical: null,
      reason: '',
      isNoRelation: false,
      isWrongLabel: false,
      addNewRelation: false,
      isSkip: false,
      isSuccess: false,
      objectList: []
    };
  }

  ngOnInit() {

  }

  onRadioChange() {
    if (this.selectedType)
      this.sceneData.isTypical = (this.selectedType == 1);
  }

  onLabelCorrect(){
    if (this.selectedLabelStatus)
      this.sceneData.isWrongLabel = (this.selectedLabelStatus == 2);
  }

  addNewRelation(){
    this.sceneData.addNewRelation = true;
  }

  submit(){
    this.sceneData.isSuccess = true;
  }

  skip(){
    this.sceneData.isSkip = true;
  }

}
