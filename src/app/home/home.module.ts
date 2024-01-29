import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonNavLink, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { InteractiveMessageComponent } from '../components/interactive-message/interactive-message.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    InteractiveMessageComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
