import { Property, PropertyService } from 'src/app/services/property.service';
import { FileUploadService } from './../../../services/file-upload.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertOptions, NavController } from '@ionic/angular';
import { TenantWithoutId } from 'src/app/services/tenant.service';
import { Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.page.html',
  styleUrls: ['./add-tenant.page.scss'],
})
export class AddTenantPage {
  propertyId: string = ""
  property?: Property

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    rentAmount: new FormControl('', [Validators.required]),
    depositAmount: new FormControl('', [Validators.required]),
    rentalAgreement: new FormControl('', [Validators.required]),
  })
  pdfData?: string

  saving = false
  alertOptions?: AlertOptions

  constructor(
    activatedRoute: ActivatedRoute,
    private navController: NavController,
    private propertyService: PropertyService
  ) {
    let id = activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.propertyId = id
      this.loadPropertyDetails()
    } else {
      navController.back
    }
  }

  loadPropertyDetails = () => {
    this.propertyService.getProperty(this.propertyId).then(
      (property) => this.property = property,
      () => this.navController.back()
    ).catch(() => {
      () => this.navController.back()
    })
  }

  getError(key: string, label: String) {
    let errors = this.form.get(key)?.errors
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

  onFileSelected(event: Event) {
    let files = (event.target as HTMLInputElement & EventTarget)?.files
    if (!files || files.length == 0) {
      return
    }
    const file = files[0]
    let reader = new FileReader()
    reader.onload = () => {
      console.log('onload:', reader.result);
      this.pdfData = reader.result as string
    }
    reader.onerror = (error) => {
      console.log('onerror:', error);
      this.pdfData = undefined
    };
    reader.readAsDataURL(file)
  }

  uploadRentAgreement(tenantId: string) {
    if (!this.pdfData) {
      return this.propertyService.removeTenant(tenantId, this.propertyId)
    }
    this.propertyService.updateRentAgreement(this.pdfData, this.propertyId, tenantId).then(() => {
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
    }, (error) => {
      this.propertyService.removeTenant(tenantId, this.propertyId)
      this.failedToAddTenant("Failed to upload rent agreement")
      this.saving = false
    }).catch((error) => {
      this.propertyService.removeTenant(tenantId, this.propertyId)
      this.failedToAddTenant(error.message ?? "Failed to upload rent agreement")
      this.saving = false
    })
  }

  onSubmit = () => {
    if (this.form.invalid || !this.pdfData) {
      return this.failedToAddTenant("Please provide valid inputs.")
    }
    this.saving = true
    let tenant = this.form.value as TenantWithoutId
    this.propertyService.addTenant(tenant, this.propertyId).then(
      (tenant) => this.uploadRentAgreement(tenant),
      (error) => this.failedToAddTenant(error.message)
    )
  }

  failedToAddTenant = (message: string) => {
    this.saving = false
    this.alertOptions = {
      header: "Failed to add tenant",
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
