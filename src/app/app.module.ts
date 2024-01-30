import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PropertyService } from './services/property.service';
import { TenantService } from './services/tenant.service';
import { FileUploadService } from './services/file-upload.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: PropertyService, useClass: PropertyService},
    { provide: TenantService, useClass: TenantService},
    { provide: FileUploadService, useClass: FileUploadService}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
