# Storybook Addon CodePen Launcher

This package is still in the alpha phase. Please submit any issues [HERE](https://github.com/robertkever/storybook-addon-codepen-launcher/issues).

This Storybook addon allows you to launch CodePen examples directly from your Storybook stories. Follow the steps below to integrate and use this addon in your project.

## Installation

First, install the addon via npm:

```bash
npm install --save-dev @rkever2/storybook-addon-codepen-launcher
```

## Register Addon

Add the addon to your Storybook configuration. Edit your `.storybook/main.js` file to include the addon:

```javascript
// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'storybook-addon-codepen-launcher', // 👈 register the addon here
  ],
};

export default config;
```

## Configuration

You can configure the codepen launcher addon globally and at the story level. See [CodepenSettingsConfig.json](./src/components//codepen/CodepenSettingsConfig.json)

Below is a basic example using the most basic settings.

### Global Settings

Set global settings in your `src/preview.js` file. Any settings, whether set here or not, can be overwritten at the story level (see Story Settings below);

```javascript
// src/preview.js
const preview: Preview = {
  parameters: {
    codepenLauncher: {
      global: {
        titlePrepend: "My Project Name",
        titlePrependSeperator: " - ",
        resultsIframeBodyDefaultPadding: "10px",
        removeCommentsFromHtml: true,
      },
      options: {
        css_external:
          "https://URL_TO_MY_FRAMEWORK_STYLES",
        js_external:
          "https://URL_LINK_TO_MY_FRAMEWORK_SCRIPTS",
      },
    }
  }
};

export default preview;
```

### Story Settings

```javascript
import React from "react";
import { MyComponent } from "./MyComponent";

export default {
    title: "MyComponent",
    component: MyComponent,
};

const Template = (args) => <MyComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
    // component props...
    args: {
        // component args...
    },
    codepenLauncher: {
        globals: {
            // global settings...
        },
        post: {
            // post settings...
        },
        options: {
            // codepen options...
        },
    },
};
```

## Settings Explained

TODO: add list of available settings with descriptions. For now, see [CodepenSettingsConfig.json](./src/components//codepen/CodepenSettingsConfig.json)
