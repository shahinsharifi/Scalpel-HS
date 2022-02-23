import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseComponent } from './adverse.component';

describe('AdverseComponent', () => {
  let component: AdverseComponent;
  let fixture: ComponentFixture<AdverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
