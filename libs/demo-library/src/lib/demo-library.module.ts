import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorfulButtonModule } from './components/colorful-button/colorful-button.module';

@NgModule({
  imports: [
    CommonModule,
    ColorfulButtonModule
  ],
  exports: [
    ColorfulButtonModule
  ],
  declarations: [],
})
export class DemoLibraryModule {}
