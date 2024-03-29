import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImageGridComponent } from '../image-grid/image-grid.component';

@Component({
  selector: 'select-multiple-files',
  standalone: true,
  templateUrl: './select-multiple-files.component.html',
  styleUrls: ['./select-multiple-files.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ImageGridComponent
  ]
})
export class SelectMultipleFilesComponent {
  @Input("accept") accept = ""
  @Input("label") label = ""
  @Input("placeholder") placeholder = ""
  @Output("onFilesSelected") filesSelected = new EventEmitter()

  selectedFiles: string[] = []

  onFilesSelected(event: Event) {
    this.selectedFiles = []
    const files = (event.target as HTMLInputElement & EventTarget)?.files ?? []
    console.log('onFilesSelected:', files);
    if (!files || files.length == 0) {
      return this.filesSelected.emit([])
    }
    let readFile = (selectedPhotos: string[], index: number) => {
      if (index >= files.length) {
        this.selectedFiles = selectedPhotos
        return this.filesSelected.emit(selectedPhotos)
      }
      let reader = new FileReader()
      reader.onload = () => {
        console.log('onload:', reader.result);
        selectedPhotos.push(reader.result as string)
        readFile(selectedPhotos, index + 1)
      }
      reader.onerror = (error) => {
        console.log('onerror:', error);
      };
      reader.readAsDataURL(files[index])
    }
    readFile([], 0)
  }
}
