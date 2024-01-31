import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { NavController } from '@ionic/angular';
import { InteractiveMessageComponent } from 'src/app/components/interactive-message/interactive-message.component';
import { Property, PropertyService } from 'src/app/services/property.service';
import { Tenant } from 'src/app/services/tenant.service';

@Component({
  selector: 'property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage {
  propertyId: string = ""

  loading = false
  property?: Property
  tenants: Tenant[] = []
  interactiveMessage?: {
    message?: string,
    actionText: string,
    action: (component?: InteractiveMessageComponent) => void
  }
  pdfURL?: string
  pdfData?: SafeHtml

  headerImageData?: string
  photosDataKeys: string[] = []
  photosData: {
    [key: string]: string 
  } = {}

  constructor(
    activatedRoute: ActivatedRoute,
    private propertyService: PropertyService,
    private navController: NavController,
    private sanitizer: DomSanitizer
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
    this.loading = true
    this.interactiveMessage = undefined
    this.propertyService.getProperty(this.propertyId).then(
      this.propertyDetailsLoaded,
      this.failedToLoadPropertyDetails
    ).catch((error) => {
      console.log('error:', error)
      this.failedToLoadPropertyDetails({
        message: "Cannot connect to SimplifyEm. Please check your internet connection!"
      })
    })
  }

  propertyDetailsLoaded = (property: Property) => {
    this.property = property
    this.tenants = this.propertyService.getTenants(property)
    this.loading = false
    this.interactiveMessage = undefined
    this.propertyService.propertyListUpdated.subscribe(this.loadPropertyDetails)

    this.photosData = {}
    this.property.photos.forEach((photo) => {
      Filesystem.readFile({
        path: photo,
        directory: Directory.External
      }).then((result) => {
        if (photo == this.property?.photos[0]) {
          this.headerImageData = `data:image/*;base64,${result.data}`
        }
        this.photosData[`data:image/*;base64,${result.data}`] = photo
        this.photosDataKeys = Object.keys(this.photosData)
      })
    })
  }

  failedToLoadPropertyDetails = (error: {message: string}) => {
    this.loading = false
    this.property = undefined
    this.interactiveMessage = {
      message: error.message,
      actionText: "Back",
      action: () => this.navController.back()
    }
  }

  onAddTenantClicked = () => {
    this.navController.navigateForward([
      'property', this.propertyId, 'tenant', 'add'
    ])
  }

  onRemoveTenantClicked = (tenant: Tenant) => {
    this.propertyService.removeTenant(tenant.id, this.propertyId)
    this.loadPropertyDetails()
  }

  showRentAgreement(tenant: Tenant) {
    this.pdfURL = tenant.rentalAgreementURL
    console.log('showRentAgreement:', this.pdfURL)

    Filesystem.readFile({
      path: tenant.rentalAgreementURL,
      directory: Directory.External
    }).then((result) => {
      console.log('readFile.result:', result)
      // this.pdfData = `data:application/pdf;base64,${result.data}`
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${result.data}`)
      // this.pdfData = this.sanitizer.bypassSecurityTrustUrl(`data:application/pdf;base64,${result.data}`)
    }, (error) => {
      // TODO: show error alert
      console.log('readFile.reject:', error)
    }).catch((error) => {
      // TODO: show error alert
      console.log('readFile.catch:', error)
    })
  }

  hideRentAgreement() {
    this.pdfData = undefined
    this.pdfURL = undefined
    console.log('hideRentAgreement:', this.pdfURL)
  }

  onDeletePhotoClicked(index: number) {
    console.log('onDeletePhotoClicked:', index)
    const data = this.photosDataKeys[index]
    const path = this.photosData[data]
    if (!path || !this.propertyService.deletePropertyPhotos([path], this.propertyId)) {
      return console.log('onDeletePhotoClicked: failed')
    }
    this.photosDataKeys.splice(index, 1)
    delete this.photosData[data]
    console.log('onDeletePhotoClicked: success:', this.photosDataKeys.length, this.property?.photos.length, path)
  }
}
