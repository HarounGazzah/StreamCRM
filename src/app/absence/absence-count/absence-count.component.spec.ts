import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceCountComponent } from './absence-count.component';

describe('AbsenceCountComponent', () => {
  let component: AbsenceCountComponent;
  let fixture: ComponentFixture<AbsenceCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
