import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { InteractiveMessageComponent } from '../components/interactive-message/interactive-message.component';
import { PropertyListComponent } from '../components/property-list/property-list.component';
import { AddPropertyPage } from '../pages/add-property/add-property.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    InteractiveMessageComponent,
    PropertyListComponent
  ],
  declarations: [HomePage, AddPropertyPage]
})
export class HomePageModule {}
