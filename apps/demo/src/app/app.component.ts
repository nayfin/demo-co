import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@demo-co/api-interfaces';
import { EditableState } from '@demo-co/editable';

@Component({
  selector: 'demo-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  editableState: EditableState = 'displaying'
  someText = 'Hank Venture';
  constructor(private http: HttpClient) {}

  handleStartEdit() {
    this.editableState = 'editing';
  }

  handleUpdate(newValue: string) {
    this.someText = newValue;
    this.editableState = 'updating';
    setTimeout(() => {
      this.editableState = 'displaying';
    }, 2000);
  }

  handleUpdateCancel() {
    this.editableState = 'displaying'
  }
}
