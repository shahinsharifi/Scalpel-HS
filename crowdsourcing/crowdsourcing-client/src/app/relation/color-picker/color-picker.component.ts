import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Item} from "../drop-down-list/drop-down-list.component";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input('name')
  name: String;

  @Input('reset')
  reset: boolean = false;

  @Output('onColorSelected')
  colorSelected = new EventEmitter<Item>();

  isOpen: boolean;

  formControl = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reset)
      this.resetForm();
  }

  resetForm(){
    this.formControl.reset();
  }

  onFocus(){
    this.isOpen = true;
  }

  public onColorSelected(color){
    this.colorSelected.emit(color);
  }

}
