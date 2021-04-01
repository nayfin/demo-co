import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule, TextModule } from './components';

@NgModule({
  imports: [
    CommonModule,
    TextModule,
    PaginatorModule
  ],
  exports: [
    TextModule,
    PaginatorModule
  ]
})
export class EditableModule {}
