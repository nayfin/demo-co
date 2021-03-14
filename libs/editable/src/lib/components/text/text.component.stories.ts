import { ReactiveFormsModule } from '@angular/forms';
import { text, number, boolean } from '@storybook/addon-knobs';
import { TextComponent } from './text.component';

export default {
  title: 'TextComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule
    ]
  },
  component: TextComponent,
  props: {
    backgroundColor: text('backgroundColor', `#D0B0DA`),
    uiState: text('uiState', 'editing'),
    textValue: text('textValue', ''),
  }
})
