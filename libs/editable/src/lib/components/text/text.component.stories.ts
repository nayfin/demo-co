import { IStory, Meta, /* Story */ } from '@storybook/angular';
import { text } from '@storybook/addon-knobs';
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
  // The values we don't want rendered by Storybook, here anything that ends with 'Data'
  excludeStories: /.*Data$/
} as Meta;

const textStoryFactory: AngularStoryFactory<TextComponent> = (props) => {
  return () => ({
    component: TextComponent,
    moduleMetadata: {
      imports: [ReactiveFormsModule]
    },
    props: {
      textValue: 'Ziggy Stardust',
      ...actionData,
      ...props
    }
  })
}

export const displaying = textStoryFactory({state: 'displaying'});

export const editing = textStoryFactory({state: 'editing'});

export const updating = textStoryFactory({state: 'updating'});


// Another way to abstract story creation
// const Template: Story<TextComponent> = (args: TextComponent) => ({
//   component: TextComponent,
//   moduleMetadata: {
//     imports: [ReactiveFormsModule]
//   },
//   props: args
// });

// export const Displaying = Template.bind({});
// Displaying.args = {
//   state: 'displaying'
// };

// export var Editing = Template.bind({});
// Displaying.arg = {
//   state: 'editing'
// }
