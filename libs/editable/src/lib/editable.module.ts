import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextModule } from './components/text/public_api';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    TextModule,
  ],
  exports: [
    TextModule
  ],
  declarations: [ImageViewerComponent]
})
export class EditableModule {}
