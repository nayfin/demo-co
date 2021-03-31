import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditableUiState } from '../../types';

/**
 * A Component that can be edited
 * @param state the state of the editable component: 'editing' | 'updating' | 'displaying'
 */
@Component({
  selector: 'editable-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit {

  @Input() @HostBinding('style.background') backgroundColor = `#D0B0DA`;

  @Input() uiState: EditableUiState = 'editing';

  _textValue = '';
  @Input() set textValue(value: string) {
    this._textValue = value;
    if (this.control) {
      this.control.setValue(value);
    }
  }

  @Output() updateText = new EventEmitter<string>();
  @Output() cancelEdit = new EventEmitter();
  @Output() startEdit = new EventEmitter();

  @ViewChild('textInput') textInput: ElementRef;
  control: FormControl;

  ngOnInit() {
    this.control = new FormControl(
      this._textValue
    );
  }

  initiateUpdateText() {
    const newValue = this.control.value;
    this.updateText.emit(newValue);
  }

  cancelUpdateText() {
    this.cancelEdit.emit();
  }

  enableEditing() {
    this.startEdit.emit();
  }
}
