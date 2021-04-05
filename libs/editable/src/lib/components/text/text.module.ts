import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './text.component';
import { InternalDirectivesModule } from '../../directives/internal-directives.module';
@NgModule({
  declarations: [TextComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InternalDirectivesModule
  ],
  exports: [TextComponent]
})
export class TextModule { }
