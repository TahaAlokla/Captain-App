import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantTablesComponent } from './restaurant-tables.component';

describe('RestaurantTablesComponent', () => {
  let component: RestaurantTablesComponent;
  let fixture: ComponentFixture<RestaurantTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
