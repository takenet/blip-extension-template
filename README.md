<p align="center">
  <img src="https://raw.githubusercontent.com/heloineto/blip-extension-template/main/public/blip.svg" width="100px" align="center" alt="Blip logo" />
  <h1 align="center">Blip Extension Template</h1>
  <p align="center">
    Scaffold extensions for the Blip platform
  </p>
</p>

## Installation

To start your extension using this template, run the command below:

```shell
npm create blip-extension@latest
```

Then follow the prompts!

See [create-blip-extension](https://github.com/heloineto/create-blip-extension#readme) for more details on supported templates.

> If for some reason the command above doesn't work, simply cloning this repository should suffice.

### Tech Stack

- React
- TypeScript or JavaScript
- Tailwind CSS
- Blip Design System
- Iframe Message Proxy
- ESLint, Prettier & CSpell
- Husky with lint-staged and commitlint
- i18next
- Cypress

> Note: Although recommended, you don't have use this template to create Blip extensions.
> You can use any stack as long as you can render your web app as an iframe in the Blip portal.

<!-- This stuff is kind of assumed or too "under-the-hood" -->
<!-- -   React Router DOM -->
<!-- -   NPM -->
<!-- -   Vite -->
<!-- -   Fontsource -->

## How to create your Blip extension

In this section, you will learn how to set up and develop a Blip extension.

> This guide assumes that you have basic knowledge of JavaScript and React concepts,
> and know how to use the Blip platform.

### What exactly is a Blip extension?

In technical terms, A blip extension is simply a web application viewed as an iframe inside the Blip platform.
It can do everything a web app can, and also communicate with the main platform though the [iframe-message-proxy](https://github.com/takenet/iframe-message-proxy) API.

### Step 1: Setup

Begin by scaffolding your project following the instructions on the [installation section](#installation).

After running the development server, you will be able to see the extension running on http://localhost:3000/.

### Step 2: Running the extension inside Blip

To be able to communicate with the main platform, your extension must be running inside the Blip platform. Due to company policy, I can't show you how to do it here, so if you are interested in learning how to do this, please reach out.

### Step 3: Using the Blip APIs

The Blip platform provide multiple API endpoints that allow you to communicate with the main platform.

See the utility functions inside `src/lib/iframe-messages` to get an idea of how that looks like.

You can look how to do a specific thing on the [Blip Documentation](https://docs.blip.ai/#introduction).

As I understand, not everything is fully documented. If you can't find what you want to do in the documentation, I would recommend asking around in the [Blip forum](https://forum.blip.ai/).

### Step 4: Using other APIs

As a web application, you can use any API you want, or develop your own.

Simply make HTTP requests inside your extension. [See how to do this in React](https://react.dev/reference/react/useEffect#fetching-data-with-effects).

### Step 5: CI/CD

This template comes with a CI/CD pipeline already set up for Azure DevOps. You can see it in `azure-pipelines.yml`. However, this pipeline is specific to my organization (Blip), and uses internal templates.

If you are not part of Blip, you can use this pipeline as a reference to create your own.

These files are related to the pipeline, and can be removed if you are not using it:

```
- azure-pipelines.yml
- Dockerfile
- charts/*
```

### Step 5: Testing

The old template used Jest and RTL (React Testing Library), however, there were some issues with it, that would make tests very painful to write:

- JSDOM doesn't support web components (widely used by Blip Design System)
- RTL doesn't actually render the component, it only renders a representation of it. This causes a lot ot problems and the need to constantly mock things.

To fix this issue, I decided to switch over to Cypress. Cypress is way more powerful, and alongside of solving the problems mentioned above, it also:

- Allows for better coverage (It actually renders the component)
- Visual testing (so you can see if your component is rendering correctly)
- Easier and more intuitive API

### Step 5: Develop!

Now it's up to you. Build what you want to, and don't forget to submit it to the Blip Store once it's done. Happy coding!

## How to re-create this template

To have an up-to-date project, verify when this template was last updated. If you believe it was too long ago, consider recreating it following (and changing if necessary) the steps below.

1. Create a new React project using Vite. When prompted, choose React with TypeScript + SWC or JavaScript + SWC. [Instructions here.](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

2. Install Blip Design System. [Instructions here.](https://design.take.net/240287753/p/216ef2-instalao/t/773b48)

   2.1. Add `optimizeDeps: { exclude: ['blip-ds/loader'] }` to `./vite.config.ts`. This is a workaround to make blip-ds work with Vite. [See issue](https://github.com/vitejs/vite/issues/12434#issue-1626394546)

3. Install Tailwind. [Instructions here.](https://tailwindcss.com/docs/guides/vite)

4. Install the Nunito Sans font using Fontsource. [Instructions here.](https://fontsource.org/docs/getting-started)

   4.1. Choose which font weights & styles to use, to cut down on payload sizes. [See configuration.](./src/lib/setup/fonts.ts)

   4.2. Set it as the default font with Tailwind CSS. [Instructions here.](https://tailwindcss.com/docs/font-family#customizing-the-default-font)

5. Install Prettier. [Instructions here.](https://prettier.io/docs/en/install.html)

   5.1. Configure Prettier. [See configuration.](./package.json)

6. Install ESLint. [Instructions here.](https://eslint.org/docs/latest/use/getting-started)

   6.1. Integrate Prettier with ESlint. [Instructions here.](https://prettier.io/docs/en/integrating-with-linters.html)

   6.2. Integrate Tailwind CSS with ESLint. [Instructions here.](https://github.com/francoismassart/eslint-plugin-tailwindcss#2-install-eslint-plugin-tailwindcss)

   6.3. Configure ESLint. [See configuration.](./.eslintrc.cjs)

7. Configure Git hooks

   7.1. Install husky. [Instructions here.](https://typicode.github.io/husky/#/?id=install)

   7.2. Install lint-staged. [Instructions here.](https://www.npmjs.com/package/lint-staged)

   7.3. Install commitlint. [Instructions here.](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)

8. Configure VScode settings

   8.1. Configure settings. [See configuration.](./.vscode/settings.json)

   8.2. Configure extensions. [See configuration.](./.vscode/extensions.json)

9. Install CSpell. [Instructions here.](https://cspell.org/docs/installation/)

   9.1. Add CSpell's Brazilian Portuguese Dictionary. [Instructions here.](https://github.com/streetsidesoftware/cspell-dicts/tree/main/dictionaries/pt_BR)

   9.2. Add CSpell's Spanish Dictionary. [Instructions here.](https://github.com/streetsidesoftware/cspell-dicts/tree/main/dictionaries/es_ES)

   9.3. Configure CSpell. [See configuration.](./package.json)

10. Install i18next. [Instructions here.](https://react.i18next.com/getting-started)

    10.1. Add type safety. [Instructions here.](https://www.i18next.com/overview/typescript)

11. Install React Router Dom [Instructions here.](https://reactrouter.com/en/main/start/tutorial#setup)

12. Install Testing Libraries. [Instructions here.](https://vitest.dev/guide/#adding-vitest-to-your-project)

    12.1. Install Vitest. [Instructions here.](https://vitest.dev/guide/#adding-vitest-to-your-project)

    12.2. Install Cypress. [Instructions here.](https://docs.cypress.io/guides/getting-started/installing-cypress)

13. Install the iframe-message-proxy package

    13.1. If using TypeScript, add package's types [See definitions.](./src/%40types/iframe-message-proxy.d.ts)

    13.2. Create iframe-message-proxy helper functions (src/lib/iframe-messages)

14. Finishing touches

    14.1. Set the website title to "Blip Extension".

    14.2. Set the website favicon. [See favicon.](./public/blip.svg)

    14.3. Install `tailwind-blip-ds`. [Instructions here.](https://github.com/heloineto-take/tailwind-blip-ds#installation)

    14.5. Add blip language detector. [See code.](./src/lib/setup/i18n.ts)

Note: To keep the project's root folder clean, transform the configuration files with few lines into keys on `package.json`. Example: The file `.lint-staged.config.cjs` can be a `lint-staged` key on `package.json`.
