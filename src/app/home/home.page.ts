import { InteractiveMessageComponent } from './../components/interactive-message/interactive-message.component';
import { Component } from '@angular/core';
import { PropertiesListService, Property } from '../services/properties-list.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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

  constructor(private propertiesList: PropertiesListService,
    private navController: NavController) {
    this.loadProperties();
  }

  loadProperties = () => {
    this.loading = true
    this.interactiveMessage = undefined
    this.propertiesList.getProperties().then(
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
    if (properties.length == 0) {
      this.interactiveMessage = {
        message: "Looks like you haven't registered any property yet. Want to register one?",
        actionText: "Add Property",
        action: this.userClickedAddProperty
      }
    } else {
      this.properties = properties
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

  userClickedAddProperty = () => {
    this.navController.navigateForward(['add-property'])
  }
}
