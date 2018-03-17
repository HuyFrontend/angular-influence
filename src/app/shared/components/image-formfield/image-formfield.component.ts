import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from '@shared/utils';
@Component({
  selector: 'app-image-formfield',
  styleUrls: ['./image-formfield.component.scss'],
  template: `
  <div class="image-formfield">
    <img #fileImage on-click="selectFile(inputFile)" alt="profile image" class="img-thumbnail open-file" [attr.src]="domSanitizer.bypassSecurityTrustUrl(imageSrc)">
    <input #inputFile type="file" class="form-control hidden hide" accept="image/*" (change)="fileChangeEvent($event)">
  </div>`
})
export class ImageFormfieldComponent implements OnInit {

  @Input() imageSrc: string;
  @Output() onImageChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
  }
    // open file
  public selectFile = (inputFile) => {
    inputFile.click();
  }
  
  // change avatar
  private fileChangeEvent = (fileInput: any) => {
    const files = fileInput.srcElement.files;
    if (files.length) {

      const file = fileInput && fileInput.srcElement ? fileInput.srcElement.files[0] : null;
      this.imageSrc = URL.createObjectURL(file);
      
      let onLoadImage = (event) => {
        const result = `\'` + event.target.result + `\'`;
        this.onImageChanged.next({file: file, result: result});
      };

      Utils.getImageData(file, onLoadImage);
    }
  };
}
