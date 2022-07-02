import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantClientsComponent } from './resturant-clients.component';

describe('ResturantClientsComponent', () => {
  let component: ResturantClientsComponent;
  let fixture: ComponentFixture<ResturantClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResturantClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResturantClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
