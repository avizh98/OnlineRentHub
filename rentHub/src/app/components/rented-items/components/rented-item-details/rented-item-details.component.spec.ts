import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedItemDetailsComponent } from './rented-item-details.component';

describe('RentedItemDetailsComponent', () => {
  let component: RentedItemDetailsComponent;
  let fixture: ComponentFixture<RentedItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentedItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentedItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
