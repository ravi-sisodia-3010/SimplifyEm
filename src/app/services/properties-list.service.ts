import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertiesListService {

  getProperties() {
    return new Promise<Property[]>((resolve, reject) => {
      setTimeout(() => {
        // if (Math.random() < 0.5) {
          resolve([])
        // } else {
        //   reject({
        //     message: "Something went wrong. Please try again later!"
        //   })
        // }
      }, 400)
    })
  }
}

export interface Property {
  id: number,
	name: string,
	address: {
		line1: string,
		line2: string
		city: string,
		state: string,
		postalCode: number
		country: string
	},
	photos: [string]
}