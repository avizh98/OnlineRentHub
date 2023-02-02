import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRentsComponent } from './manage-rents.component';

describe('ManageRentsComponent', () => {
  let component: ManageRentsComponent;
  let fixture: ComponentFixture<ManageRentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
