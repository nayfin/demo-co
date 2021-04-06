# Using Storybook and Nx to document component libraries

### www.github.com/nayfin/demo-co/blob/main/STORYBOOK.md

## Nx and Storybook Overview

### Nx

Nx is an extensible dev tool for monorepos. Find more information [here](https://nx.dev/). We're using it here because it will allow us to group multiple component libraries under a single repo, and to take advantage of some of it's plugins to configure our project for Storybook.

### Storybook

Storybook is a component development toolkit for React, Vue, Angular, Svelte and Ember. Storybook itself is designed to showcase components in isolation, but by integrating with other software (cypress, jest, compodoc, etc..) and developing useful addons, they are quickly building a platform to facilitate all stages of library development cycle:

- development
- testing
- review
- documentation
- release

## Storybook vs Demo app

The most common method of developing/testing/showcasing/documenting components is to create a demo app and create an example for each of feature of each component.  There are pros and cons to each method.

  ### Storybook

  **Pros:**

  - Isolated development, demos, unit  and e2e testing
  - Easily capture different states of component
  - Very fast onchange refreshes, and state is saved between onchange reloads
  - Easily publish documentation for users, and demos for designers and stakeholders
  - Markdown can be used for documentation and usage examples
  - Lots of supported frameworks
  - Evolving Rapidly: frequent release of new features

  **Cons:**

  - Controlling state of story is difficult, especially for Angular
  - React focused: Docs aren't as fleshed out for Angular and some features don't work as seamlessly
  - Evolving rapidly: frequent changes to API

  ### Demo App

  **Pros:**

  - Good for showing examples of complex usage and composition of multiple components
  - Can serve as example of Angular best practices for rest of organization
  - Can verify that there are no issues with library after it is published

  **Cons:**

  - Lots of extra work creating structure, setting up routes, etc...
  - Capturing all states is tedious and time consuming
  - Difficult to provide meaningful documentation and usage examples

## Walkthrough

We'll go through setup and then implement some of Storybook's useful features. The heading of each step corresponds to a branch name in the repo with all the changes for that step.

### 00-editable-library

We are going to be working with a component library called `editable`. It's designed to facilitate inline editing of documents, similar to updating a single field in a JIRA ticket. Right now there is only a single component, but we'll add Storybook now. We want to make sure we are documenting these components as we build them to help ensure adoption in our organization.

### 01-installs-storybook

Add the Storybook plugin and addons to dev dependencies


```bash
npm i -D @nrwl/storybook @storybook/addon-actions @storybook/addon-docs
```

Run Nx storybook schematic (~1 min)

```bash
nx g @nrwl/angular:storybook-configuration <project-name>
```

Now run storybook

```bash
nx run <project-name>:storybook
```

And we get an error, but this expected as our component depends on the `ReactiveFormsModule` and we haven't provided it in the story's configuration.

You can find more details on setup at [nx docs](https://nx.dev/latest/angular/plugins/storybook/overview).

### 02-import-required-modules

So import `ReactiveFormsModule` in the story and add it to the `moduleMetadata` property of the `primary` story.

```ts
// text.component.stories.ts
export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule
    ]
  }
})
```

### 03-constrain-knobs

You'll notice the `knobs` generated in our story by the nx schematic. While these are great, currently they accept any string, which doesn't do much to convey the acceptable inputs to the user. So, let's refine them to constrain the knobs, this will keep invalid inputs from breaking the story and help convey valid inputs to the consumer


Import the new knobs:

```ts
import { text, select, color } from '@storybook/addon-knobs';

```

Then update the props with the appropriate knob functions

```ts

export const primary = () => ({
  ...
  props: {
    backgroundColor: color('backgroundColor', `#D0B0DA`),
    uiState: select('uiState', ['displaying','editing','updating'], 'editing'),
    textValue: text('textValue', 'Initial Value'),
  }
})

```

### 04-use-storybook-actions-to-monitor-outputs

 Actions allow us to hook into any of the component's methods and monitor the arguments passed to them. Here we'll use them to check the values emitted by our outputs. Let's add some to our story.

```ts
  props: {
    backgroundColor: color('backgroundColor', `#D0B0DA`),
    uiState: select('uiState', ['displaying','editing','updating'], 'editing'),
    textValue: text('textValue', 'Initial Value'),
    updateText: action('updateText'),
    cancelEdit: action('cancelEdit'),
    startEdit: action('startEdit')
  }
```

TODO: This might be a good time to talk about the architecture of the component a little more. Explain why inputs drive the display and outputs don't change state, leaving the parent app to decide what to do with the outputs.

### 05-run-cypress-test

During the Storybook setup we opted to have the plugin setup up cypress for us. So it set up a project(`<project-name>-e2e`) in the `apps` folder configured to run against our stories, and stubbed out a basic test for us.

`apps/editable-e2e/src/integration/text.component.ts`

```ts
describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textcomponent--primary&knob-backgroundColor&knob-uiState=displaying&knob-textValue'));

  it('should render the component with correct background-color', () => {
    cy.get('editable-text').should('exist')
  });
});

```

Let's add a test to check the background color of the component.

```ts
  it('should render the component with correct background-color', () => {
    cy.get('editable-text').should('have.css', 'background-color', 'rgb(208, 176, 218)');
  });
```

### 06-generate-docs-with-compodoc

Compodoc is a great tool for auto-generating docs. We can leverage its output here so that we can enhance the docs generated by storybook.

```bash
nx add @twittwer/compodoc
nx g @twittwer/compodoc:config <project-name>
```

Add the docs addon in `.storybook/main.js`

```js
module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-docs',
    ...
  ],
};
```

Tell Storybook where to find the generated docs JSON in `.storybook/preview.js` file.

```js
import { setCompodocJson } from '@storybook/addon-docs/angular';
import compodocJson from '../../../dist/compodoc/editable/documentation.json';

setCompodocJson(compodocJson);
```

And the last step is in the `text.component.stories.ts` file. We just need to assign a story to the default export.

```ts
export default {
  // The title in sidenav for our group of stories for this component
  title: 'Editable Text Component',
  // Connects the story to the generated docs
  component: TextComponent
}
```

In one terminal generate the compodoc json
```bash
nx run <project>:compodoc:json --watch
```

In another terminal run storybook
```bash
nx run <project>:storybook
```

Now we can add some comments to the properties of the `TextComponent` code and it will be reflected in our Storybook docs.

```ts
export class TextComponent implements OnInit {
  /**
   * Controls background color of control
   */
  @Input() @HostBinding('style.background') backgroundColor = `#D0B0DA`;
  /**
   * Controls interactive state of control
   */
  @Input() state: EditableState = 'editing';
  ...
}
```
### 07-enhance-docs-with-mdx

MDX is a system for using `jsx` together with `markdown`, and it's a great way to embed our stories our documentation.

The Nx Storybook schematic we ran earlier configured the project to use `mdx` files. So all we have to do is create a new file `text.component.stories.mdx` and add the following.

````md
<!-- Import our dependancies for the stories -->
import { ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './text.component.ts';

<!-- As well as some built in storybook components that we'll use in the documentation -->
import { Meta, Story, ArgsTable } from '@storybook/addon-docs/blocks';

<!-- The meta component tells Storybook the title of the story and which component it's for -->
<Meta title='Editable Text Component/MDX' component={TextComponent} />

# Editable Text Component

Some **markdown** description, or whatever you want

## Visual States

### displaying

<!-- Configure the story using the Story component -->
<Story name="basic" height="60px">
  {{
    component: TextComponent,
    moduleMetadata: {
      imports: [ReactiveFormsModule]
    },
    props: {
      state: 'displaying',
      textValue: 'Initial Value'
    }
  }}
</Story>

<!-- Use a code snippet to show users an example of usage -->
```html
  <!-- example.component.html -->
  <editable-text
    [textValue]="'Initial Value'"
    [state]="'displaying'"
    (startEdit)="handleStartEdit()"
    (cancelEdit)="handleCancelEdit()"
    (updateText)="handleUpdateText($event)">
  </editable-text>
```

## ArgsTable
<!-- Use the ArgTable component to display property definitions for component -->
<ArgsTable of={TextComponent} />
````

### 08-generate-stories-for-new-component

If you need to generate stories for new components in your library you can simply run:

```bash
nx generate @nrwl/angular:stories <project-name> --generateCypressSpecs
```
### 09-template-usage

If we like we can create a template for our story. This allows us to add `HTML` to story and even use multiple components together.

```ts
export const withTemplate: Story<TextComponent> = (args: TextComponent): IStory => ({
  // Module dependencies can be configured here
  moduleMetadata: {
    imports: [ReactiveFormsModule],
    declarations: [TextComponent]
  },
  // Declare property values that should be duplicated across stories here
  props: {
    ...args
  },
  template: `
    <h2>Displaying</h2>
    <editable-text [textValue]="'initialValue'" [state]="'displaying'"></editable-text>
    <h2>Editing</h2>
    <editable-text [textValue]="'initialValue'" [state]="'editing'"></editable-text>
    <h2>Updating</h2>
    <editable-text [textValue]="'initialValue'" [state]="'updating'"></editable-text>
  `
});
```


### 10-configure-docs-integrations

Running two terminals to keep our storybook stories inline with our compodoc documentation isn't a great experience. Let's add an `nx run` command to our angular json.

```json
// `angular.json`
{
  "projects": {
    "<project-name>": {
      "architect": {
        "storybook": {
          /* existing @nrwl/storybook config */
        },
        "build-storybook": {
          /*  existing @nrwl/storybook config */
        },
        "compodoc": {
          /* existing @twittwer/compodoc config */
        },
        "storydoc": {
          "builder": "@nrwl/workspace:run-commands",
          "options": {
            "commands": [
              "npx nx run <project>:compodoc:json --watch",
              "npx nx run <project>:storybook"
            ]
          }
        },
        "build-storydoc": {
          "builder": "@nrwl/workspace:run-commands",
          "options": {
            "commands": [
              "npx nx run <project>:compodoc:json",
              "npx nx run <project>:build-storybook"
            ]
          }
        }
      }
    }
  }
}
```

Now we can run `nx run <project-name>:storydoc` to run in watch mode `nx run <project-name>:storydoc` to build storybook for deployment to a docs or showcase page.

### 11-abstracting-reusable-story

Copy pasting stories over and over isn't very dry. Below the `template` story isn't exported as a story, it acts a base for the `export`ed stories below it. This way we can easily showcase an example of our component in each of it's three ui states.

```ts
import { ReactiveFormsModule } from '@angular/forms';
import { IStory, Story } from '@storybook/angular';
import { TextComponent } from './text.component';

export default {
  // The title in sidenav for our group of stories for this component
  title: 'Editable Text Component'
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
```

## Resources

* [Overview](https://nx.dev/latest/angular/plugins/storybook/overview) of Nx Storybook Plugin
* Storybook For Angular [Tutorial](https://www.learnstorybook.com/intro-to-storybook/angular/en/get-started/): In depth look at how to connect Storybook to an Angular CLI app and some of the ways it can help boost collaboration and code quality.
* Nx Compodoc Plugin [documentation](https://github.com/twittwer/nx-tools/tree/master/libs/compodoc#readme). Specifically, check "How to integrate with `@nrwl/storybook`?" details near the bottom of the page.
