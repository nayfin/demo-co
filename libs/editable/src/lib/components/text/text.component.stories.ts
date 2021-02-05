import { IStory, Story, Meta } from '@storybook/angular'
import { text } from '@storybook/addon-knobs';

import { ReactiveFormsModule } from '@angular/forms';

import { TextComponent } from './text.component';

type AngularStoryFactory<T = any> = (props: Partial<T>) => () => IStory;

export default {
  // The title to display in the sidenav
  title: 'Components/Editable Text Component',
  // The component the story is for, this should create docs auto-magically
  component: TextComponent,
  // The values we don't want rendered by Storybook, here anything that ends with 'Data'
  excludeStories: /.*Data$/
} as Meta;

export const displaying = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule
    ]
  },
  component: TextComponent,
  props: {
    state: 'displaying',
    textValue: 'Ziggy Stardust'
  }
});

export const editing = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule
    ]
  },
  component: TextComponent,
  props: {
    state: 'editing',
    textValue: 'Ziggy Stardust'
  }
});
