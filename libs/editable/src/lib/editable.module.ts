import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextModule } from './components/text/text.module';
import { ColorfulButtonModule, ImageViewerModule } from './components';

@NgModule({
  imports: [
    CommonModule,
    TextModule,
    ImageViewerModule,
    ColorfulButtonModule
  ],
  exports: [
    TextModule,
    ImageViewerModule,
    ColorfulButtonModule
  ]
})
export class EditableModule {}
