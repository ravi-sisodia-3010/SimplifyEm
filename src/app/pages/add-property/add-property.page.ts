import { PropertyWithoutId } from './../../services/property.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertOptions, IonicModule, NavController } from '@ionic/angular';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss']
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

  alertOptions?: AlertOptions

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
    if (this.form.invalid) {
      return this.failedToAddProperty("Please provide valid inputs.")
    }
    let value = this.form.value
    let property: PropertyWithoutId = {
      name: value.name!,
      address: {
        line1: value.address!.line1!,
        line2: value.address!.line2!,
        city: value.address!.city!,
        state: value.address!.state!,
        postalCode: value.address!.postalCode!,
        country: value.address!.country!
      },
      photos: []
    }
    try {
      this.propertyService.addProperty(property)
      this.alertOptions = {
        message: "Property successfully added.",
        buttons: [{
          text: "Ok!",
          handler: () => {
            this.alertOptions = undefined
            this.navController.back()
          }
        }]
      }
    } catch (error) {
      let message: string
      if (typeof error === 'string') {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      } else {
        message = "Something went wrong. Please try again later!"
      }

      this.failedToAddProperty(message)
    }
  }

  failedToAddProperty(message: string) {
    this.alertOptions = {
      header: "Failed to add property",
      message: message,
      buttons: [{
        text: "Retry",
        handler: () => {
          this.alertOptions = undefined
          setTimeout(() => {
            this.onSubmit()
          }, 100)
        }
      }, {
        text: "Cancel",
        handler: () => {
          this.alertOptions = undefined
          this.navController.back()
        }
      }]
    }
  }
}
