import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTenantPage } from './add-tenant.page';

describe('AddTenantPage', () => {
  let component: AddTenantPage;
  let fixture: ComponentFixture<AddTenantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddTenantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
