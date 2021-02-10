import { IStory, Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { ReactiveFormsModule } from '@angular/forms';

import { TextComponent } from './text.component';

type AngularStoryFactory<T = any> = (props: Partial<T>) => () => IStory;

const actionData = {
  updateText: action('updateText'),
  cancelEdit: action('cancelEdit'),
  startEdit : action('startEdit'),
}

export default {
  // The title to display in the sidenav
  title: 'Components/Editable Text Component',
  // The component the story is for, this should create docs auto-magically
  component: TextComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // The values we don't want rendered by Storybook, here anything that ends with 'Data'
  excludeStories: /.*Data$/
} as Meta;


// Another way to abstract story creation
const template: Story<TextComponent> = (args: TextComponent): IStory => ({
  component: TextComponent,
  moduleMetadata: {
    imports: [ReactiveFormsModule]
  },
  props: {
    textValue: 'initialValue',
    ...args
  }
});

export const editing = template.bind({});
editing.args = {
  state: 'editing',
};

export const displaying = template.bind({});
displaying.args = {
  state: 'displaying',
};

export const updating = template.bind({});
updating.args = {
  state: 'updating',
};

