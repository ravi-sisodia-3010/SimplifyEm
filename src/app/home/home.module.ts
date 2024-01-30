import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { InteractiveMessageComponent } from '../components/interactive-message/interactive-message.component';
import { PropertyListComponent } from '../components/property-list/property-list.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    InteractiveMessageComponent,
    PropertyListComponent
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
