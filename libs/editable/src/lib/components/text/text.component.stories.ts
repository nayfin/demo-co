import { ReactiveFormsModule } from '@angular/forms';
import { text, number, boolean } from '@storybook/addon-knobs';
import { TextComponent } from './text.component';

export default {
  title: 'TextComponent',
  component: TextComponent
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule
    ]
  },
  component: TextComponent,
  props: {
    state: text('state', 'editing'),
    textValue: text('textValue', ''),
  }
})
