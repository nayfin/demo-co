import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextModule } from './components/text/text.module';
import { ImageViewerModule } from './components';

@NgModule({
  imports: [
    CommonModule,
    TextModule,
    ImageViewerModule
  ],
  exports: [
    TextModule,
    ImageViewerModule
  ]
})
export class EditableModule {}
