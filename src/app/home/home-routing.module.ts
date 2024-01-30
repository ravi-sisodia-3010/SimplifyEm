import { AddPropertyPage } from './../pages/add-property/add-property.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PropertyDetailsPage } from '../pages/property-details/property-details.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'add',
    component: AddPropertyPage,
  },
  {
    path: ':id',
    component: PropertyDetailsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
