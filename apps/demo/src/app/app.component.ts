import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditableUiState } from '@demo-co/editable';

@Component({
  selector: 'demo-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  editableUiState: EditableUiState = 'displaying';
  someText = 'Hank Venture';
  constructor(private http: HttpClient) {}

  handleStartEdit() {
    this.editableUiState = 'editing';
  }

  handleUpdate(newValue: string) {
    this.someText = newValue;
    this.editableUiState = 'updating';
    setTimeout(() => {
      this.editableUiState = 'displaying';
    }, 2000);
  }

  handleUpdateCancel() {
    this.editableUiState = 'displaying'
  }
}
