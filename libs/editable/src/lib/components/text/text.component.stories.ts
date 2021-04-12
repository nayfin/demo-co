import { action } from '@storybook/addon-actions';
import { text, select, color } from '@storybook/addon-knobs';
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
    dataStatus: select('dataStatus', ['saved', 'updating'],'saved'),
    textValue: text('textValue', ''),
    updateText: action('updateText')
  }
})
