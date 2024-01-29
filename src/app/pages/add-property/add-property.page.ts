import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
})
export class AddPropertyPage {
  constructor(private navController: NavController) {
  }
}
