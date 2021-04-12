import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataStatus } from '../../models';

@Component({
  selector: 'editable-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit {

  @Input() @HostBinding('style.background') backgroundColor = `#D0B0DA`;

  @Input() dataStatus: DataStatus = 'saved';
  isEditing: boolean;

  _textValue = '';
  @Input() set textValue(value: string) {
    this._textValue = value;
    if (this.control) {
      this.control.setValue(value);
    }
  }

  @Output() updateText = new EventEmitter<string>();

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
    this.control.setValue(this._textValue);
    this.isEditing = false
  }

  enableEditing() {
    this.isEditing = true;
  }
}
