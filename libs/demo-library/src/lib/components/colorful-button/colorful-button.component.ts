import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'demo-co-colorful-button',
  templateUrl: './colorful-button.component.html',
  styleUrls: ['./colorful-button.component.scss']
})
export class ColorfulButtonComponent {
  @Input() label = 'CLICK'
  @Input() backgroundColor = `#D0B0DA`;
  @Input() labelColor = `#000`

  @Output() buttonClick = new EventEmitter();
}
