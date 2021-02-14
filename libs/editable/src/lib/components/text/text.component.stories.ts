import { ReactiveFormsModule } from '@angular/forms';
import { IStory, Story } from '@storybook/angular';
import { TextComponent } from './text.component';

export default {
  // The title in sidenav for our group of stories for this component
  title: 'Editable Text Component',
  // Connects the story to the generated docs
  component: TextComponent,
  // Refine Storybook controls here
  argTypes: {
    // use color picker to control backgroundColor input
    backgroundColor: { control: 'color'},
    // use select to control state input
    state: {
      control: {
        type: 'select',
        options: ['displaying', 'editing', 'updating']
      }
    },
    // use actions to watch output events
    updateText: { action: 'updateText' },
    cancelEdit: { action: 'cancelEdit' },
    startEdit: { action: 'startEdit' },
  }
}

// A template we can reuse to easily create a new story to represent each state of our component
const template: Story<TextComponent> = (args: TextComponent): IStory => ({
  // The component the story represents
  component: TextComponent,
  // Module dependencies can be configured here
  moduleMetadata: {
    imports: [ReactiveFormsModule]
  },
  // Declare property values that should be duplicated across stories here
  props: {
    textValue: 'initialValue',
    ...args
  }
});

// story representing editing state
export const editing = template.bind({});
editing.args = {
  state: 'editing',
};

// story representing editing state
export const displaying = template.bind({});
displaying.args = {
  state: 'displaying',
};

// story representing editing state
export const updating = template.bind({});
updating.args = {
  state: 'updating',
};

