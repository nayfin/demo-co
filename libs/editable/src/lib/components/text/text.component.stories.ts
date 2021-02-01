import { text, number, boolean } from '@storybook/addon-knobs';
import { TextComponent } from './text.component';

export default {
  title: 'TextComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: TextComponent,
  props: {
    state: text('state', 'editing'),
    textValue: text('textValue', ''),
  }
})
