import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'editable-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  /**
   * The total number of pages being paginated
   */
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() increment = new EventEmitter();
  @Output() decrement = new EventEmitter();
}
