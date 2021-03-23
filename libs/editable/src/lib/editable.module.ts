import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextModule, ImageViewerModule } from './components/public_api';

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
