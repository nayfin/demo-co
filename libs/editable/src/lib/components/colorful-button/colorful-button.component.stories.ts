import { text, number, boolean } from '@storybook/addon-knobs';
import { ColorfulButtonComponent } from './colorful-button.component';

export default {
  title: 'ColorfulButtonComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: ColorfulButtonComponent,
  props: {
    label: text('label', 'CLICK'),
    backgroundColor: text('backgroundColor', `#D0B0DA`),
    labelColor: text('labelColor', `#000`),
  }
})