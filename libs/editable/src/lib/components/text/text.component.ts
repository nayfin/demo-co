import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'editable-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit {
  /**
   * controls background color
   */
  @Input() @HostBinding('style.background') backgroundColor = `#D0B0DA`;
  /**
   * controls the interactive state of the component
   */
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
}
