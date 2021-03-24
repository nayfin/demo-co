import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditableUiState } from '../../types/ui-state';

@Component({
  selector: 'editable-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {

  @Input() imageUrl: string;
  @Input() imageDescription: string;

  @Output() urlEntered = new EventEmitter<string>();

  urlInputState: EditableUiState = 'displaying';

  onStartEdit() {
    console.log('start edit')
    this.urlInputState = 'editing';
  }
  onCancelEdit() {
    console.log('cancelEdit')
    this.urlInputState = 'displaying'
  }
  onUpdateText(url: string) {
    this.imageUrl = url;
    this.urlInputState = 'displaying'
  }

}
