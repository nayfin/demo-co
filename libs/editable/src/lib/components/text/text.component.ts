import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'editable-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit {

  @Input() @HostBinding('style.background') backgroundColor = `#D0B0DA`;

  @Input() isUpdating: boolean;
  isEditing: boolean;

  _textValue = '';
  @Input() set textValue(value: string) {
    this._textValue = value;
    if (this.control) {
      this.control.setValue(value);
    }
  }

  @Output() updateText = new EventEmitter<string>();

  @ViewChild('textInput') textInput: ElementRef;
  control: FormControl;

  ngOnInit() {
    this.control = new FormControl(
      this._textValue
    );
  }

  initiateUpdateText() {
    this.isEditing = false;
    const newValue = this.control.value;
    this.updateText.emit(newValue);
  }

  cancelUpdateText() {
    this.isEditing = false
  }

  enableEditing() {
    this.isEditing = true;
  }
}
