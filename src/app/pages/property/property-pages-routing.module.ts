import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyPage } from './add-property/add-property.page';
import { PropertyDetailsPage } from './property-details/property-details.page';
import { AddTenantPage } from './add-tenant/add-tenant.page';

const routes: Routes = [
  {
    path: 'add',
    component: AddPropertyPage
  }, {
	  path: ':id',
	  component: PropertyDetailsPage
  }, {
    path: ':id/tenant/add',
    component: AddTenantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
