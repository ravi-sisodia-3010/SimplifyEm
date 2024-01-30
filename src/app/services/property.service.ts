import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public propertyListUpdated = new EventEmitter()

  private __saveProperties(properties: Property[]) {
    localStorage.setItem('properties', JSON.stringify(properties))
    this.propertyListUpdated.emit()
  }

  private __getProperties(): Property[] {
    let propertiesStr = localStorage.getItem('properties')
    let properties: Property[]
    if (propertiesStr) {
      properties = JSON.parse(propertiesStr)
    } else {
      properties = []
    }
    return properties
  }

  getProperties() {
    return new Promise<Property[]>((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(this.__getProperties())
        } catch (error) {
          if (typeof error === 'string') {
            reject({message: error})
          } else if (error instanceof Error) {
            reject({message: error.message})
          } else {
            reject({message: "Something went wrong. Please try again later!"})
          }
        }
      }, 400)
    })
  }

  addProperty(_property: PropertyWithoutId) {
    // localStorage.removeItem("propertyIdCounter")
    // localStorage.removeItem("properties")

    let id = parseInt(localStorage.getItem("propertyIdCounter") ?? "0")
    localStorage.setItem("propertyIdCounter", "" + (id + 1))

    let property: Property = {
      id: "" + (id + 1),
      ..._property
    }

    let properties = this.__getProperties()
    properties.push(property)
    this.__saveProperties(properties)
  }

  updateProperty(property: Property) {
    let properties = this.__getProperties()
    properties = properties.filter((property) => {
      return property.id != property.id
    })
    properties.push(property)
    this.__saveProperties(properties)
  }

  deleteProperty(property: Property) {
    this.deletePropertyUsingId(property.id)
  }

  deletePropertyUsingId(id: string) {
    let properties = this.__getProperties()
    properties = properties.filter((property) => {
      return property.id != id
    })
    this.__saveProperties(properties)
  }
}

export interface PropertyWithoutId {
	name: string,
	address: {
		line1: string,
		line2: string
		city: string,
		state: string,
		postalCode: string,
		country: string
	},
	photos: string[]
}

export interface Property {
  id: string,
	name: string,
	address: {
		line1: string,
		line2: string
		city: string,
		state: string,
		postalCode: string,
		country: string
	},
	photos: string[]
}
