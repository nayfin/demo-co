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
    backgroundColor: text('backgroundColor', `#D0B0DA`),
    dataStatus: text('dataStatus', 'saved'),
    textValue: text('textValue', ''),
  }
})