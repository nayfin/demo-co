import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { EditableModule } from '@demo-co/editable';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, EditableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
