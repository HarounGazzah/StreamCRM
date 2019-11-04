import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbsencesComponent } from './list-absences.component';

describe('ListAbsencesComponent', () => {
  let component: ListAbsencesComponent;
  let fixture: ComponentFixture<ListAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
