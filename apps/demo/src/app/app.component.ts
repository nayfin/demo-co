import { Component } from '@angular/core';

@Component({
  selector: 'demo-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isUpdating = false;
  someText = 'Initial Value';

  handleUpdate(newValue: string) {
    this.someText = newValue;
    this.isUpdating = true;
    setTimeout(() => {
      this.isUpdating = false;
    }, 2000);
  }
}
