import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorfulButtonComponent } from './colorful-button.component';

describe('ColorfulButtonComponent', () => {
  let component: ColorfulButtonComponent;
  let fixture: ComponentFixture<ColorfulButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorfulButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorfulButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
