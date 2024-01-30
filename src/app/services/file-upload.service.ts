import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Tenant } from './tenant.service';
import { Property } from './property.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  async uploadFile(file: string, path: string) {
    return this.saveFileLocally(file, path)
  }

  saveFileLocally(file: string, path: string) {
    console.log('saveFileLocally:', path, file)
    return Filesystem.writeFile({
      path: path,
      data: file,
      directory: Directory.External,
      recursive: true
    })
  }
}
