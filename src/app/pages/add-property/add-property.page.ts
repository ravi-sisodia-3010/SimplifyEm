import { PropertyWithoutId } from './../../services/property.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Property, PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'add-property',
  standalone: true,
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    PropertyService
  ]
})
export class AddPropertyPage {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    address: new FormGroup({
      line1: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
      line2: new FormControl('', [Validators.maxLength(30)]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
    })
  })
  constructor(
    private navController: NavController,
    private propertyService: PropertyService) {
  }

  get nameInputError() {
    let errors = this.form.get('name')?.errors
    if (errors?.['required']) {
      return "Property Name is required"
    } else if (errors?.['minlength']) {
      return `Property Name should be minimum ${errors?.['minlength']?.['requiredLength']} characters`
    } else if (errors?.['maxlength']) {
      return `Property Name should be maximum ${errors?.['maxlength']?.['requiredLength']} characters`
    } else {
      return undefined
    }
  }

  getAddressError(key: string, label: String) {
    let errors = this.form.get('address')?.get(key)?.errors
    if (errors?.['required']) {
      return `${label} is required`
    } else if (errors?.['minlength']) {
      return `${label} should be minimum ${errors?.['minlength']?.['requiredLength']} characters`
    } else if (errors?.['maxlength']) {
      return `${label} should be maximum ${errors?.['maxlength']?.['requiredLength']} characters`
    } else {
      return undefined
    }
  }

  onSubmit() {
    let value = this.form.value
    let property: PropertyWithoutId = {
      name: value.name!,
      address: {
        line1: value.address!.line1!,
        line2: value.address!.line2!,
        city: value.address!.city!,
        state: value.address!.city!,
        postalCode: value.address!.postalCode!,
        country: value.address!.country!
      },
      photos: []
    }
    try {
      this.propertyService.addProperty(property)
    } catch (error) {
      console.log('Cannot add property. Error:', error)
      // TODO: show alert
    }
  }
}
