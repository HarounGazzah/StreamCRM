import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceValidationComponent } from './absence-validation.component';

describe('AbsenceValidationComponent', () => {
  let component: AbsenceValidationComponent;
  let fixture: ComponentFixture<AbsenceValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
