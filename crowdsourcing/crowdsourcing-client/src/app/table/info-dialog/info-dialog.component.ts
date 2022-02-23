import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../../dialog/dialog.component";
import {DataService} from "../../services/data.service";
import {Attribute, Object, Predicate, Type} from "../../relation/add-relation/add-relation.component";
import {Relation} from "../../relation/relation";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoDialogComponent implements OnInit {

  selectedType: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public relation: Relation) {
    if(this.relation.isTypical == null) {
      this.relation.weight = 10;
    }else{
      this.selectedType = (this.relation.isTypical) ? '1' : '2';
    }
  }

  ngOnInit(): void {

  }

  onRadioChange() {
    if (this.selectedType)
      this.relation.isTypical = (this.selectedType == 1);
  }

  closeWindow(){
    this.dialogRef.close();
  }
}
