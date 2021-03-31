import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorfulButtonComponent } from './colorful-button.component';



@NgModule({
  declarations: [ColorfulButtonComponent],
  exports: [ColorfulButtonComponent],
  imports: [
    CommonModule
  ]
})
export class ColorfulButtonModule { }
