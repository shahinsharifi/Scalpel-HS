import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Instruction1Component} from "./instruction1.component";



describe('InstructionComponent', () => {
  let component: Instruction1Component;
  let fixture: ComponentFixture<Instruction1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Instruction1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Instruction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
