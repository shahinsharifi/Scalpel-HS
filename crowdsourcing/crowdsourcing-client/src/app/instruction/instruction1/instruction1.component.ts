import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-instruction1',
  templateUrl: './instruction1.component.html',
  styleUrls: ['./instruction1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Instruction1Component implements OnInit , OnChanges{

  @Input('stepIndex')
  private stepIndex: number;

  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;

  @Output('onStepChanged') onStepChanged = new EventEmitter();
  @Output('onInstructionFinished') onInstructionFinished = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.stepIndex){
      this.myStepper.selectedIndex = changes.stepIndex.currentValue;
    }
  }

  onStepIndexChanged(event){
    this.onStepChanged.emit(event.selectedIndex);
  }

}
