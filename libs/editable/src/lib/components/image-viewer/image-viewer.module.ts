import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { TextModule } from '../text/text.module';



@NgModule({
  declarations: [
    ImageViewerComponent
  ],
  exports: [
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    TextModule
  ]
})
export class ImageViewerModule { }
