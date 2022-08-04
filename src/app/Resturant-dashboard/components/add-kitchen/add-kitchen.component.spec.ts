import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKitchenComponent } from './add-kitchen.component';

describe('AddKitchenComponent', () => {
  let component: AddKitchenComponent;
  let fixture: ComponentFixture<AddKitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKitchenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
