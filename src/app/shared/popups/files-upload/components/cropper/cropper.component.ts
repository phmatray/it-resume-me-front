import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile } from '@app/shared/popups/files-upload/utils';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  @Input() imageFile: File | null = null;
  @Output() changed = new EventEmitter<File>();

  croppedImage: string | null;

  constructor() {
    this.croppedImage = null;
  }

  ngOnInit(): void {
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64 || null;
  }

  onCrop(): void {
    if (this.croppedImage && this.imageFile) {
      const file = dataURLtoFile(this.croppedImage, this.imageFile.name);

      if (file) {
        this.changed.emit(file);
      }
    }
  }
}
