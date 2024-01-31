import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'image-grid',
  standalone: true,
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
  imports: [
    CommonModule,
    IonicModule
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ImageGridComponent {
  @Input("label") label = ""
  @Input("labelHidden") labelHidden = false
  @Output("onDeleteImageClicked") imageDeleted = new EventEmitter<number>()

  @Input("images") images: string[] = []

  onDeleteImageClicked(index: number) {
    console.log('onDeleteImageClicked:', index)
    this.imageDeleted.emit(index)
  }
}
