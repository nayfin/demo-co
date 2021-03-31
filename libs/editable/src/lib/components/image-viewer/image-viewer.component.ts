import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'editable-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {

  @Input() imageUrl: string;
  @Input() imageDescription: string;


  @Output() urlEntered = new EventEmitter<string>();

  onUpdateText(url: string) {
    this.imageUrl = url;
    this.urlInputState = 'displaying'
  }

}
