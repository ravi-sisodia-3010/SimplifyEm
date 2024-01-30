import { AddPropertyPage } from '../pages/property/add-property/add-property.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PropertyDetailsPage } from '../pages/property/property-details/property-details.page';
import { AddTenantPage } from '../pages/property/add-tenant/add-tenant.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
