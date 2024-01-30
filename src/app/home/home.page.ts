import { InteractiveMessageComponent } from './../components/interactive-message/interactive-message.component';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PropertyService, Property } from '../services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  loading = false;
  properties: Property[] = [];
  showAddMoreProperty = false

  component?: Component

  interactiveMessage?: {
    message?: string,
    actionText: string,
    action: (component?: InteractiveMessageComponent) => void
  }

  constructor(
    private propertyService: PropertyService,
    private navController: NavController
  ) {
    propertyService.propertyListUpdated.subscribe(this.loadProperties)
    this.loadProperties();
  }

  loadProperties = () => {
    this.loading = true
    this.interactiveMessage = undefined
    this.propertyService.getProperties().then(
      this.propertiesLoaded,
      this.failedToLoadProperties
    ).catch(() => {
      this.failedToLoadProperties({
        message: "Cannot connect to SimplifyEm. Please check your internet connection!"
      })
    })
  }

  propertiesLoaded = (properties: Property[]) => {
    this.loading = false
    this.properties = properties
    if (properties.length == 0) {
      this.interactiveMessage = {
        message: "Looks like you haven't registered any property yet. Want to register one?",
        actionText: "Add Property",
        action: this.onAddPropertyClicked
      }
    } else {
      this.interactiveMessage = undefined
    }
    this.showAddMoreProperty = true
  }

  failedToLoadProperties = (error: {message: string}) => {
    this.loading = false
    this.interactiveMessage = {
      message: error.message,
      actionText: "Retry",
      action: this.loadProperties
    }
  }

  onAddPropertyClicked = () => {
    this.navController.navigateForward(['property', 'add'])
  }

  onPropertyClicked(property?: Property) {
    this.navController.navigateForward(['property-details', property])
  }

  onPropertyDeleteClicked(property: Property) {
    this.propertyService.deleteProperty(property)
  }
}
