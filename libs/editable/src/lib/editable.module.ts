import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextModule } from './components/text/public_api';

@NgModule({
  imports: [
    CommonModule,
    TextModule,
  ],
  exports: [
    TextModule
  ]
})
export class EditableModule {}
