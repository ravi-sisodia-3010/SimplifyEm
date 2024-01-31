import { WriteFileResult } from '@capacitor/filesystem';
import { FileUploadService } from './file-upload.service';
import { TenantService, TenantWithoutId } from './tenant.service';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public propertyListUpdated = new EventEmitter()

  constructor(
    private tenantService: TenantService,
    private fileUploadService: FileUploadService
  ) {
    // localStorage.removeItem('properties')
    // localStorage.removeItem('propertyIdCounter')
  }

  private __save(properties: Property[]) {
    localStorage.setItem('properties', JSON.stringify(properties))
    this.propertyListUpdated.emit()
  }

  private __get(): Property[] {
    let propertiesStr = localStorage.getItem('properties')
    let properties: Property[]
    if (propertiesStr) {
      properties = JSON.parse(propertiesStr)
    } else {
      properties = []
    }
    return properties
  }

  private __getProperty(id: string): Property | null {
    let properties = this.__get().filter((property) => property.id == id)
    if (properties.length == 0) {
      return null
    } else {
      return properties[0]
    }
  }

  private __getMessage(error: unknown) {
    if (typeof error === 'string') {
      return error
    } else if (error instanceof Error) {
      return error.message
    } else {
      return "Something went wrong. Please try again later!"
    }
  }

  getProperties() {
    return new Promise<Property[]>((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(this.__get())
        } catch (error) {
          reject({message: this.__getMessage(error)})
        }
      }, 400)
    })
  }

  getProperty(id: string) {
    return new Promise<Property>((resolve, reject) => {
      setTimeout(() => {
        let property = this.__getProperty(id)
        if (property) {
          resolve(property)
        } else {
          reject({message: "No such property exists!"})
        }
      }, 400)
    })
  }

  addProperty(_property: PropertyWithoutId) {
    let id = parseInt(localStorage.getItem("propertyIdCounter") ?? "0")
    let newId = "" + (id + 1)

    let properties = this.__get()
    properties.push({
      id: newId,
      ..._property
    })
    this.__save(properties)

    localStorage.setItem("propertyIdCounter", newId)
    return newId
  }

  updateProperty(property: Property) {
    let properties = this.__get()
    let index = properties.findIndex((_property) => _property.id == property.id)
    if (index) {
      properties[index] = property
    } else {
      properties.push(property)
    }
    this.__save(properties)
  }

  deleteProperty(property: Property) {
    this.deletePropertyUsingId(property.id)
  }

  deletePropertyUsingId(id: string) {
    let properties = this.__get()
    properties = properties.filter((property) => {
      return property.id != id
    })
    this.__save(properties)
  }

  getTenants(property: Property) {
    return this.tenantService.getTenants(property.tenants)
  }

  addTenant(tenant: TenantWithoutId, propertyId: string) {
    return new Promise<string>((resolve, reject) => {
      let properties = this.__get()
      let index = properties.findIndex((_property) => _property.id == propertyId)
      if (index == -1) {
        return reject({message: "No such property exists!"})
      }
      try {
        let tenantId = this.tenantService.addTenant(tenant)
        properties[index].tenants.push(tenantId)
        this.__save(properties)
        resolve(tenantId)
      } catch (error) {
        reject({message: this.__getMessage(error)})
      }
    })
  }

  removeTenant(tenantId: string, propertyId: string) {
    this.tenantService.deleteTenant(tenantId)

    let properties = this.__get()
    let index = properties.findIndex((property) => property.id == propertyId)
    if (index == -1) {
      return
    }
    properties[index].tenants = properties[index].tenants.filter(((id) => id != tenantId))
    this.__save(properties)
  }

  updateRentAgreement(file: string, propertyId: string, tenantId: string) {
    const fileName = `rentAgreement_${Date.now()}.pdf`
    const path = `properties/${propertyId}/tenants/${tenantId}/${fileName}`
    return new Promise<string>((resolve, reject) => {
      this.fileUploadService.uploadFile(file, path).then((result) => {
        this.tenantService.updateRentAgreement(path, tenantId)
        resolve(result.uri)
      }, (error) => {
        reject(this.__getMessage(error))
      })
    })
  }

  uploadPropertyPhotos(files: string[], propertyId: string) {
    var paths = <string[]>[]
    const uploadFilePromises = files.map((file, index) => {
      const fileName = `${Date.now()}_${index + 1}.jpg`
      const path = `properties/${propertyId}/photos/${fileName}`
      paths.push(path)
      return this.fileUploadService.uploadFile(file, path)
    })
    const executePromisesSequentially = async () => {
      const results = await uploadFilePromises.reduce(async (accumulator, currentPromise) => {
        const results = await accumulator;
        return [...results, await currentPromise];
      }, Promise.resolve(<WriteFileResult[]>[]));

      let properties = this.__get()
      let index = properties.findIndex((property) => property.id == propertyId)
      if (index == -1) {
        return results
      }
      properties[index].photos = [
        ...properties[index].photos,
        ...paths
      ]
      this.__save(properties)

      return results
    };
    return executePromisesSequentially();
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
	photos: string[],
  tenants: string[]
}

export interface Property extends PropertyWithoutId {
  id: string
}

export interface PropertyPhoto {
  id: string,
  url: string
}
