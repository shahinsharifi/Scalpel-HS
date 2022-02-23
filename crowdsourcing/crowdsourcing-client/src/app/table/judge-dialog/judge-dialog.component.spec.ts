import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeDialogComponent } from './judge-dialog.component';

describe('JudgeDialogComponent', () => {
  let component: JudgeDialogComponent;
  let fixture: ComponentFixture<JudgeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
