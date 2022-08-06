import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListEditComponent } from './category-list-edit.component';

describe('CategoryListEditComponent', () => {
  let component: CategoryListEditComponent;
  let fixture: ComponentFixture<CategoryListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
