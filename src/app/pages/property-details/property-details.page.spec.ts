import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyDetailsPage } from './property-details.page';

describe('PropertyDetailsPage', () => {
  let component: PropertyDetailsPage;
  let fixture: ComponentFixture<PropertyDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PropertyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
