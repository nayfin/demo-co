import { Component } from '@angular/core';
import { DataStatus } from '@demo-co/editable';

@Component({
  selector: 'demo-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  status: DataStatus = 'saved';
  someText = 'Initial Value';

  currentPage = 0;
  totalPages = 14;

  eventStream: string[] = [];

  handleUpdate(newValue: string) {
    this.logEvent('text updated')
    this.someText = newValue;
    this.status = 'updating';
    setTimeout(() => {
      this.status = 'saved';
    }, 2000);
  }

  incrementPage() {
    this.logEvent('increment')
    this.currentPage++;
  }

  decrementPage() {
    this.logEvent('decrement')
    this.currentPage--;
  }

  logEvent(name: string) {
    this.eventStream.unshift(name);
  }
}
