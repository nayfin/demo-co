import { text, color, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TextComponent } from './text.component';
import { TextModule } from './text.module';

export default {
  title: 'TextComponent',
  component: TextComponent
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      TextModule
    ]
  },
  component: TextComponent,
  props: {
    backgroundColor: color('backgroundColor', `#D0B0DA`),
    isUpdating: boolean('isUpdating', false),
    textValue: text('textValue', ''),
    updateText: action('updateText')
  }
})
