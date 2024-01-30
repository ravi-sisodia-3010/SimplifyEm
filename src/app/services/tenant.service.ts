import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private __save(tenants: Tenant[]) {
    localStorage.setItem('tenants', JSON.stringify(tenants))
  }

  private __get(): Tenant[] {
    let tenantsStr = localStorage.getItem('tenants')
    let tenants: Tenant[]
    if (tenantsStr) {
      tenants = JSON.parse(tenantsStr)
    } else {
      tenants = []
    }
    return tenants
  }

  getTenants(ids: string[]) {
    return this.__get().filter((tenant) => ids.includes(tenant.id))
  }

  addTenant(tenant: TenantWithoutId): string {
    let id = parseInt(localStorage.getItem("tenantIdCounter") ?? "0")
    let newId = "" + (id + 1)

    let tenants = this.__get()
    tenants.push({
      id: newId,
      ...tenant 
    })
    this.__save(tenants)

    localStorage.setItem("tenantIdCounter", newId)
    return newId
  }

  deleteTenant(tenantId: string) {
    this.__save(this.__get().filter((tenant) => tenant.id != tenantId))
  }

  updateRentAgreement(path: string, tenantId: string) {
    let tenants = this.__get()
    let index = tenants.findIndex((tenant) => tenant.id == tenantId)
    if (index == -1) {
      return
    }
    tenants[index].rentalAgreementURL = path
    this.__save(tenants)
  }
}

export interface TenantWithoutId {
  name: string,
  rentAmount: string,
  depositAmount: string,
  rentalAgreementURL: string
}

export interface Tenant extends TenantWithoutId {
  id: string
}