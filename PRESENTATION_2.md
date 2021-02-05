# Part 2: Adding Documentation Using Storybook

## Setup Storybook

See [nx docs](https://nx.dev/latest/angular/plugins/storybook/overview) for more information.

### 1) Add the Storybook plugin and addons to dev dependencies


```bash
npm i -D @nrwl/storybook @storybook/addon-actions @storybook/addon-docs
```

### 2) Generate Storybook Configuration

Run Nx storybook schematic

```bash
nx g @nrwl/angular:storybook-configuration <project-name>
```

Configure additional plugins in `<workspace-name>/.storybook/main.js`

```js
module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-docs/register'
  ],
};
```

Now run storybook

```bash
nx run <project-name>:storybook
```

And we get an error, but this expected as our component depends on the `ReactiveFormsModule` and we haven't provided it in the Storybook context. So import `ReactiveFormsModule` in the story and add it to the `moduleMetadata` property of the `primary` story.

```ts
export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule
    ]
  }
})
```

Now, we can our story in the browser, including a knob for each of our inputs, all courtesy of the Nx Storybook plugin. Let's organize our story so we can have a story to represent each state.

### 3) Setup some stories

We'll start by adding some actions. Actions allow us to hook into the methods of our component, we'll use them to check the values emitted by our outputs. We'll make it easy to reuse them by creating an object of our actions

```ts
const actionsData = {
  updateText: action('updateText'),
  cancelEdit: action('cancelEdit'),
  startEdit:  action('startEdit')
};
```

We'll tell Storybook not to try and render these actions by adding the `excludeStories` property to the default export

```ts
export default {
  title: 'TextComponent',
  component: TextComponent,
  excludeStories: /.*Data$/, // Tells storybook to not render anything that ends with `Data`
}
```






### 3) Add Compodoc

```bash
nx add @twittwer/compodoc
nx g @twittwer/compodoc:config <project-name>

```

<!-- #### NOTE: Compodoc can be run with the following commands
    ```bash
    // HTML Format
    nx run <project>:compodoc
    // JSON Format
    nx run <project>:compodoc:json
    ``` -->

### 5) Configure Storybook to integrate with Compodoc

Configure storybook-watch & storybook-build targets in angular.json:

```json
{
  "projects": {
    "<project-name>": {
      "architects": {
        "storybook": {
          /* existing @nrwl/storybook config */
        },
        "build-storybook": {
          /*  existing @nrwl/storybook config */
        },
        "compodoc": {
          /* existing @twittwer/compodoc config */
        },
        "storybook-watch": {
          "builder": "@nrwl/workspace:run-commands",
          "options": {
            "commands": [
              "npx nx run <project>:compodoc:json-watch",
              "npx nx run <project>:storybook"
            ]
          }
        },
        "storybook-build": {
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

Configure Storybook Docs in libs/<project-name>/.storybook/preview.js:

```ts
import { setCompodocJson } from '@storybook/addon-docs/angular';
import compodocJson from '../../../dist/compodoc/<project-name>/documentation.json';

setCompodocJson(compodocJson);

```

### 4) Run Storybook

```bash
nx run <project-name>:storybook
```



## Resources

* [Overview](https://nx.dev/latest/angular/plugins/storybook/overview) of Nx Storybook Plugin
* Storybook For Angular [Tutorial](https://www.learnstorybook.com/intro-to-storybook/angular/en/get-started/): In depth look at how to connect Storybook to an Angular CLI app and some of the ways it can help boost collaboration and code quality.
* Nx Compodoc Plugin [documentation](https://github.com/twittwer/nx-tools/tree/master/libs/compodoc#readme). Specifically, check "How to integrate with `@nrwl/storybook`?" details near the bottom of the page.






