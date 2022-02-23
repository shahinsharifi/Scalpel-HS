import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Instruction2Component } from './instruction2.component';

describe('Instruction2Component', () => {
  let component: Instruction2Component;
  let fixture: ComponentFixture<Instruction2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Instruction2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Instruction2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
