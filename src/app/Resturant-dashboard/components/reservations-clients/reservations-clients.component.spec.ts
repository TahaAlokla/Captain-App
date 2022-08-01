import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsClientsComponent } from './reservations-clients.component';

describe('ReservationsClientsComponent', () => {
  let component: ReservationsClientsComponent;
  let fixture: ComponentFixture<ReservationsClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
