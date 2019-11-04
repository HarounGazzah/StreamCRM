import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNavbarComponent } from './resource-navbar.component';

describe('ResourceNavbarComponent', () => {
  let component: ResourceNavbarComponent;
  let fixture: ComponentFixture<ResourceNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
