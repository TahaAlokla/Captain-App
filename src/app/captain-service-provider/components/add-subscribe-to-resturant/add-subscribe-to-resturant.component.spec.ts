import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscribeToResturantComponent } from './add-subscribe-to-resturant.component';

describe('AddSubscribeToResturantComponent', () => {
  let component: AddSubscribeToResturantComponent;
  let fixture: ComponentFixture<AddSubscribeToResturantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscribeToResturantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubscribeToResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
