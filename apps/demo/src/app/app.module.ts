import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DemoLibraryModule } from '@demo-co/demo-library'
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DemoLibraryModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
