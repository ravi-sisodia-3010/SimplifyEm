import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Property } from 'src/app/services/property.service';

@Component({
  selector: 'property-list',
  standalone: true,
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class PropertyListComponent {
  @Input('properties') properties: Property[] = []
  @Output('onPropertyClicked') propertyClick = new EventEmitter<Property>()
  @Output('onPropertyDeleteClicked') propertyDeleteClick = new EventEmitter<Property>()

  onPropertyClicked(property: Property) {
    this.propertyClick.emit(property)
  }

  onPropertyDeleteClicked(property: Property) {
    this.propertyDeleteClick.emit(property)
  }
}
