import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCaptainComponent } from './home-captain.component';

describe('HomeCaptainComponent', () => {
  let component: HomeCaptainComponent;
  let fixture: ComponentFixture<HomeCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCaptainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
