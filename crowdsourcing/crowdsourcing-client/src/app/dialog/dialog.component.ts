import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Item} from "../relation/drop-down-list/drop-down-list.component";
import {TimeService} from "../services/time.service";
import {DataService} from "../services/data.service";

export interface DialogData {
  taskId: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, AfterViewInit {

  stepIndex: number;
  contentElement: any;

  hasScroll: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private elRef:ElementRef, private time: TimeService, private dataService: DataService) {

  }

  ngOnInit(): void {
    //loading labels from server
    this.stepIndex = 0;
    this.time.init();
  }

  ngAfterViewInit() {
    this.contentElement = this.elRef.nativeElement.querySelector('#contentElement');
  }

  closeWindow(){
    this.dataService.instructionTimeEffort = Number(this.time.getTimeOnPage());
    this.dialogRef.close();
  }

  onStepChanged(index){
    this.stepIndex = index;
    this.checkScroll();
  }

  goBack(){
    this.stepIndex = (this.stepIndex == 0) ? 0 : (this.stepIndex - 1);
    this.checkScroll();
  }

  goForward() {
    this.stepIndex = this.stepIndex + 1;
    this.checkScroll();
  }

  checkScroll() {
    this.hasScroll = false;
    setTimeout(() => {
      this.contentElement = this.elRef.nativeElement.querySelector('.scroll-indicator');
      this.contentElement.scrollTop = 0;
      if (this.contentElement.clientHeight != this.contentElement.scrollHeight)
        this.hasScroll = true;
    }, 300);
  }

}


