import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideModalComponent } from './ride-modal.component';

describe('RideModalComponent', () => {
  let component: RideModalComponent;
  let fixture: ComponentFixture<RideModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
