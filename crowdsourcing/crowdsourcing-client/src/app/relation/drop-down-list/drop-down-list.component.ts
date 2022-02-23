import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import * as _ from "lodash";

export interface Item {
  name: string;
}

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropDownListComponent implements OnInit {

  @Input('items')
  items: Item[] =  [];

  @Input('name')
  name: String;

  @Input('disable')
  disable: boolean = false;

  @Input('reset')
  reset: boolean = false;

  @Output('onItemSelected')
  itemSelected = new EventEmitter<Item>();

  formControl = new FormControl();
  filteredOptions: Observable<Item[]>;
  hasSelectedItem: boolean = false;

  ngOnInit() {
    this.initFilterOption();
    if(this.disable)
      this.formControl.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reset)
      this.resetForm();

    if (changes.disable) {
      if (changes.disable.currentValue)
        this.formControl.disable();
      else
        this.formControl.enable();
      this.initFilterOption();
    }
  }

  initFilterOption(){
    if(this.formControl.valueChanges != null) {
      this.filteredOptions = this.formControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : ((value) ? value.name : '')),
          map(name => name ? this._filter(name) : this.items.slice())
        );
    }
  }

  resetForm(){
    this.formControl.reset();
  }

  displayFn(object?: any): string | undefined {
    return object ? object.name : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.items.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public onOptionSelected(item){
    this.hasSelectedItem = true;
    this.itemSelected.emit(item);
  }

  onFocusOut(){
    setTimeout (() => {
      let index = _.findIndex(this.items, (item: Item) => {
        return item.name === this.formControl.value.name;
      });
      if(index == -1 && this.hasSelectedItem) {
        this.hasSelectedItem = false;
        this.formControl.patchValue(null);
        this.itemSelected.emit({name: null});
      }
    }, 100);

  }
}
