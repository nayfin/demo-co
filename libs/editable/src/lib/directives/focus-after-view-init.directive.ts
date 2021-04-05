import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[editableFocusAfterViewInit]'
})
export class FocusAfterViewInitDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    console.log('focusing')
    this.el.nativeElement.focus();
  }
}
