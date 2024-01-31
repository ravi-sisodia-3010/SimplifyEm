import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PropertyRoutingModule } from './property-pages-routing.module';
import { AddPropertyPage } from './add-property/add-property.page';
import { PropertyDetailsPage } from './property-details/property-details.page';
import { InteractiveMessageComponent } from 'src/app/components/interactive-message/interactive-message.component';
import { AddTenantPage } from './add-tenant/add-tenant.page';
import { SelectMultipleFilesComponent } from 'src/app/components/select-multiple-files/select-multiple-files.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    PropertyRoutingModule,
    InteractiveMessageComponent,
    SelectMultipleFilesComponent
  ],
  declarations: [
	  
	  PropertyDetailsPage,
    AddPropertyPage,
    AddTenantPage
  ]
})
export class PropertyPagesModule {}
