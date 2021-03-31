import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorfulButtonModule, ImageViewerModule, PaginatorModule, TextModule } from './components';

@NgModule({
  imports: [
    CommonModule,
    TextModule,
    ImageViewerModule,
    ColorfulButtonModule,
    PaginatorModule
  ],
  exports: [
    TextModule,
    ImageViewerModule,
    ColorfulButtonModule,
    PaginatorModule
  ]
})
export class EditableModule {}
