import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Instruction3Component } from './instruction3.component';

describe('Instruction3Component', () => {
  let component: Instruction3Component;
  let fixture: ComponentFixture<Instruction3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Instruction3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Instruction3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
