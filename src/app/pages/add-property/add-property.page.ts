import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'add-property',
  standalone: true,
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AddPropertyPage {
  form = new FormGroup({
    name: new FormControl(),
    address: new FormGroup({
      line1: new FormControl(),
      line2: new FormControl(),
    })
  })
  constructor(private navController: NavController) {
  }
}
