import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-instruction2',
  templateUrl: './instruction2.component.html',
  styleUrls: ['./instruction2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Instruction2Component implements OnInit {

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
