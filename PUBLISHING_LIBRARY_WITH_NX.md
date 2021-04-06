# Publishing Angular Libraries with Nx
How to build a group of interdependent publishable libraries all all namespaced under an NPM organization.

Find PRESENTATION_1.md at
## https://github.com/nayfin/demo-co

## What is Nx?
<a href="https://nx.dev/angular">
  <img width="200px" src="https://miro.medium.com/max/1281/0*44TVT2Pa3jrEkaXJ."/>
</a>

Nx is a fantastic open-source tool for building monorepos built by the Nrwl team. Simplifies generation of Angular, React, and Nest apps and libraries. Find docs [here](https://nx.dev/angular) and video tutorial [here](https://nxplaybook.com/p/nx-workspaces).


## What is an NPM Organization?
<a href="https://npmjs.com">
  <img width="200px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/330px-Npm-logo.svg.png"/>
</a>

We can create an organization through npm and group all our libraries under this organization (e.g. @angular, @ngrx, @nrwl). This indicates to the consuming developer that the same organization created all your great libraries.

## Why create libraries?
![conchords](https://media.giphy.com/media/1iTpx5PpzRugcrZK/giphy.gif)

Publishing libraries like this allows you to:
  - easily reuse features you’ve built for other apps
  - share your code with anyone interested
  - enables others to contribute back to the project
  - show everyone (developers, companies, future employers) how great you are

## Why use nx and npm organization?

Nx makes it really easy to create publishable interdependent libraries, this helps us to offer  smaller libraries that focus on a specific set of solutions (form fields, state management, ui features, layout). This keeps our libraries lightweight and prevents end-developers from having to download unused dependencies.

If using as a monorepo, we can make changes to a library and easily run tests on all consuming apps. This helps ensure we don't introduce breaking changes or that we account for the changes everywhere that they break.

Additionally, we can even have internal apps that depend directly on the libraries while other apps depend on a package from a registry.

## When should I create a publishable library?

Whenever you want access to the code you're writing outside the context you're writing it in (i.e. CLI project or Nx workspace).


## When should I use an Nx Workspace over something like @ngneat/lib

<img src="https://avatars3.githubusercontent.com/u/53073952?s=200&v=4">

There are two main reasons to choose a workspace over an Angular CLI generated library system:
- You are using the monorepo to organize projects and libraries and would also like to publish some of those libraries
- You are building interdependent libraries and need to quickly how changes to one library effect the dependent libraries

If you are only wanting to publish a single library, or multiple stand-alone libraries you should check out [@ngneat/lib](https://github.com/ngneat/lib). In addition to generating the publishable library, it generates templates for CODE_OF_CONDUCT.md, CONTRIBUTING.md, ISSUE_TEMPLATE.md, LICENSE.md, PULL_REQUEST_TEMPLATE.md, README.md. It also generates some scripts to help automate release.

## Where?

For our purposes, we are deploying to NPM as a public package, but you can easily follow similar steps to deploy to other public or private registries. Consult their docs for information on setup and publishing.

## How do we do all this?
![thinking steven](https://media.giphy.com/media/2xF8ihOYNJCG0iAXNU/giphy.gif)

### 1. Create NPM Organization
- Register for an NPM account if you don't already have one

  https://www.npmjs.com/signup

- Sign in through command line

  `npm login`

  Then follow prompts

- Decide on a name for your workspace/organization. It's a good idea to make this short. It can be something non-descriptive (@mango) if you want to have disparate libraries, or something descriptive (@ngstate) if you want to have a group of related libraries.

- Create an NPM Organization at www.npmjs.com/org/create. This will align with your Nx workspace name name allowing you to "scope" your libraries to one namespace. Do this before creating workspace to ensure that the organization name you want is available.

### 2. Install Dependencies

  `npm install -g @angular/cli`

### 3. Generate Nx Workspace

  Use the npm organization from above as the namespace.

  `npx create-nx-workspace <your-namespace>`

  This command takes a little while (~3-5 min), so go get a cup of coffee.

  Follow prompts:
  - Pick the type of project (angular or angular-nest)
  - Pick style extension (scss is great!)
  - Name default app (`examples` is usually a good bet)

  **NOTE:** Picking project type `angular` or `angular-nest` will create an 'Angular CLI Workspace' that create an `angular.json` file to configure the workspace's `libs` and `apps`. Other project types (blank, react, etc..) create an `nx.json` file to configure its `libs` and `apps`.

  <img width="500" src="./gifs/create-nx-workspace.gif">

### 4. Create a Library With a Component
  Each library should be focused on one feature (e.g. form-fields, state-management) and named appropriately.

- Generate library

  `ng generate @nrwl/angular:lib <your-library-name> --importPath=<your-namespace> --publishable`

  Don't forget the `--publishable` flag! It tells nx to generate a `ng-package.json` and `package.json` for the library and update the root `package.json`. This helps make publishing easy.

- Make public in root `package.json`

  ```json
    "private": false
  ```
- NOTE: nx 11 now disables Ivy compilation for the prod builds of `--publishable` libraries by default, so you no longer have to disable after generating lib.

- Generate the library's first component

  `ng generate component --project=<your-library-name> --export=true`

- Export the component from the libraries `index.ts`

  `export * from './input/input.component.ts`

  *NOTE:* This is not actually required, but it will be in the future after we enable Ivy for our library.

- Make it do something!

### 5. Publish Library Once

- commit changes

  `git commit -m 'Some changes on the master branch :)'`
- set initial version in package.json
- build library

  `ng build <library-name> --prod`
- publish it!

  `cd dist/libs/<library-name> && npm pack && npm publish --access public && cd ../../../`

### You published a library!!
![jake prismo 5](https://media.giphy.com/media/V2xbsCrxcLQSQ/giphy.gif)

## 6. Automated Release (v1)
  You published the library, awesome! But running all those commands manually was kind of gross. There are tools that can help, but for now there's a release script, `release.sh`, in the `scripts` folder.
  It automates release by:
  - prompting user to input which package is being released
  - ensuring that we're on the master branch
  - prompting user to input version bump type (patch, minor, or major)
  - building, packaging, and publishing the library
  - committing a release commit after publishing

  There are tons of other processes that could be added here (running tests), but it's a good start.

  You can also add an npm run script to `package.json` if you'd an alias.

  ```json
    "scripts": {
      "release": "bash ./scripts/release.sh",
      ...
    }
  ```

  There are a lot of ways to do this, and I am going to cover fancier options and important consideration when releasing interdependent packages in an upcoming talk.

  You can also checkout implementing a CI/CD pipeline with Travis [here](https://medium.com/@alfredo.perez.q/publish-angular-library-documentation-created-with-nx-using-travisci-and-github-pages-27854598239c).

## 7. Development Testbed as User Playground

  One of the most important pieces of a good library, is really good documentation. If you plan the build and keep organized examples of the features as you build them out, then it's relatively easy to post your testbed as interactive documentation on [StackBlitz](https://stackblitz.com).

  <img width="600" src="https://media.giphy.com/media/l2JdYTnwoQzUQ1lYI/giphy.gif"/>

  StackBlitz can serve any Angular CLI generated project that is on a public github repo, pretty easily. Unfortunately, our documentation app was generated by Nx and StackBlitz can't serve it at all. So we have to do a little trickery to get it to work, but it's actually a good exercise as it forces us to use the library like our users are using it. Take advantage of this by taking notes on any trouble you have setting it up.


  ### Steps
  - Organize the development testbed. I recommend each library as a lazy-loaded module with each feature as a routed component under that module. This will give you a place to test each feature, and will translate well as an example when it gets turned into docs.
  - Generate a Angular CLI project, named the same as your documentation app, next to your nx workspace.

    `cd ../ && ng new <-docs-app-name>`

  - Copy app from Nx workspace over to CLI project. Change directory back to Nx workspace and run:

    `cp -rf ./apps/<docs-app-name>/src/app ./../<docs-app-name>/src`

  - Create new repository in Github, name it after the `docs-app-name`

  - From the new cli projects root directory, connect the project to the repo

    `git remote add origin https://github.com/<github-username>/<docs-app-name>.git`

    `git push -u origin master`

  - Nx uses a different naming convention for the `<app-root>` component in the `index.html` file, using the the convention `<namespace>-root`. This will need to be updated in the CLI generated app's `index.html`. So if your namespace was `cool-ng`
  ```html
    <app-root></app-root> becomes <cool-ng-root></cool-ng-root>
  ```

  #### DOCUMENT THE FOLLOWING STEPS IN README.

  This will probably be your first time using your package outside the context of the Nx workspace, and is a good opportunity to see what any consuming user will have to do to use your library. Make sure you carefully outline what it takes to get started with your library. If you have trouble getting it setup, imagine how hard it will be for anyone else to get started.

  - Add your package as well as any `dependencies` and `peerDependencies` to the `package.json` of the CLI generated app, then `npm install`.

  - Perform any other required setup (e.g. if you need Angular Material run `ng add @angular/material`).
  - Run documentation project
    `ng serve`
  - Push changes

    `git push`
  - View it on StackBlitz
    `https://stackblitz.com/github/<your-github-username>/<your-project-name`
  - Add above link to README.md file, now users can see exactly how to implement each feature of your library.

## Notes
- Don't enable Ivy in libraries yet. View Engine (pre-Ivy) libraries are forwards compatible with Ivy apps but the reverse isn't true. Recommendation is to wait until Angular 10 before publishing Ivy libraries. The folks at Angular In Depth have a lot more advice [here](https://indepth.dev/the-angular-ivy-guide-for-library-authors/).

- Update your library's `README.md` file, this will be displayed in on it's npm page. It should help users consuming your package to get started. [Here's](https://medium.com/hackernoon/a-crash-course-on-writing-a-better-readme-d796d1f6b352) a good article on Medium help make it fancy, but at a minimum you'll want to have installation instructions and basic usage.

- If your library consumes any packages (e.g. @angular/material, @angular/forms), be sure to add those packages to the `peerDependencies` in its `package.json` file, this will warn users if they are missing its dependencies.

## Resources
- Alfredo Perez has a great series on publishing libraries with Nx. He even goes into implementing a CI/CD pipeline with Travis [here](https://medium.com/@alfredo.perez.q/publish-angular-library-documentation-created-with-nx-using-travisci-and-github-pages-27854598239c).

- If you'd like some help with your README, [here](https://medium.com/hackernoon/a-crash-course-on-writing-a-better-readme-d796d1f6b352) is a good article on Medium by Adnan Rahić. Checkout [shields.io](www.shields.io) if you'd like to add some badges to your README.

- Learn more on declaring `dependencies` and `peerDependencies` in your `package.json` [here](https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f)

- If you'd like to really dive deep, [here](https://blog.angular.io/how-we-use-angular-at-the-gdf-cd17807a9bd2) is an article from the Angular Blog on building an `update` schematic to automatically fix breaking changes when you make them.
