import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeResturantComponent } from './subscribe-resturant.component';

describe('SubscribeResturantComponent', () => {
  let component: SubscribeResturantComponent;
  let fixture: ComponentFixture<SubscribeResturantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeResturantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
