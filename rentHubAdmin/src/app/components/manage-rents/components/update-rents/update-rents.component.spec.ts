import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRentsComponent } from './update-rents.component';

describe('UpdateRentsComponent', () => {
  let component: UpdateRentsComponent;
  let fixture: ComponentFixture<UpdateRentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
