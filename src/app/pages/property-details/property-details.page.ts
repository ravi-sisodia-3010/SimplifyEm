import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InteractiveMessageComponent } from 'src/app/components/interactive-message/interactive-message.component';
import { Property, PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage {
  id: string = ""

  loading = false
  property?: Property
  interactiveMessage?: {
    message?: string,
    actionText: string,
    action: (component?: InteractiveMessageComponent) => void
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private propertyService: PropertyService,
    private navController: NavController
  ) {
    let id = activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.id = id
      this.loadPropertyDetails()
    } else {
      navController.back
    }
  }

  loadPropertyDetails = () => {
    this.loading = true
    this.interactiveMessage = undefined
    this.propertyService.getProperty(this.id).then(
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
    this.loading = false
    this.property = property
    this.interactiveMessage = undefined
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
}
