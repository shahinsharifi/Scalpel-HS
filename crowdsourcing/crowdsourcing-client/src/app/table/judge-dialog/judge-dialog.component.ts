import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../../dialog/dialog.component";
import {Relation} from "../../relation/relation";

@Component({
  selector: 'app-judge-dialog',
  templateUrl: './judge-dialog.component.html',
  styleUrls: ['./judge-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JudgeDialogComponent implements OnInit {

  scoreMoved: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public relation: Relation) {

  }

  ngOnInit(): void {

  }

  onScoreChange() {
    this.scoreMoved = true;
  }

  save(){
    this.relation.isAnnotated = true;
    this.relation.isChosen = true;
  }

}
