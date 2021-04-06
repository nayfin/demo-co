import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { TextModule } from '../text/text.module';

@NgModule({
  declarations: [ImageViewerComponent],
  imports: [
    CommonModule,
    TextModule,
  ],
  exports: [ImageViewerComponent]
})
export class ImageViewerModule { }
