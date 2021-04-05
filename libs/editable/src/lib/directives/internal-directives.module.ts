import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusAfterViewInitDirective } from './focus-after-view-init.directive';



@NgModule({
  declarations: [
    FocusAfterViewInitDirective
  ],
  exports: [
    FocusAfterViewInitDirective
  ],
  imports: [
    CommonModule
  ]
})
export class InternalDirectivesModule { }
