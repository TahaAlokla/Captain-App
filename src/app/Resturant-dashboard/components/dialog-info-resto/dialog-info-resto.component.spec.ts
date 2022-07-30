import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoRestoComponent } from './dialog-info-resto.component';

describe('DialogInfoRestoComponent', () => {
  let component: DialogInfoRestoComponent;
  let fixture: ComponentFixture<DialogInfoRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInfoRestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInfoRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
