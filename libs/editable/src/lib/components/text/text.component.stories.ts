import { text, number, boolean } from '@storybook/addon-knobs';
import { TextComponent } from './text.component';
import { TextModule } from './text.module';

export default {
  title: 'TextComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      TextModule
    ]
  },
  component: TextComponent,
  props: {
    backgroundColor: text('backgroundColor', `#D0B0DA`),
    dataStatus: text('dataStatus', 'saved'),
    textValue: text('textValue', ''),
  }
})
