import { ReactiveFormsModule } from '@angular/forms';
import { text, select, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { TextComponent } from './text.component';

export default {
  // The title in sidenav for our group of stories for this component
  title: 'Editable Text Component',
  // Connects the story to the generated docs
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
    backgroundColor: color('backgroundColor', `#D0B0DA`),
    uiState: select('uiState', ['displaying','editing','updating'], 'editing'),
    textValue: text('textValue', 'Initial Value'),
    updateText: action('updateText'),
    cancelEdit: action('cancelEdit'),
    startEdit: action('startEdit')
  }
})
