import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputAddComponent } from './table-input-add.component';

describe('TableInputAddComponent', () => {
  let component: TableInputAddComponent;
  let fixture: ComponentFixture<TableInputAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInputAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInputAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
