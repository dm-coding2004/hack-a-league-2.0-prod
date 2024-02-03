# JointJS+ Demo Application - Javascript

This application showcases the JointJS+ plugins in action and shows how the plugins
can be combined together. You can use this demo app as a reference for your own application
development.

## Running the application

Due to Same-Origin policy implemented in the majority of browsers to prevent content from being accessed if the file exists on another domain, it is recommended to access the application through a **Web server**. The application might work only partially when viewed from a filesystem location.

A simple HTTP server (requires `Node.js` and `npm`) is part of this demo. To install and start the server, please run `npm install` followed by `npm start` from the `KitchenSink/Js` directory.

The application is also available online [here](https://www.jointjs.com/rappid).

## Develop the application

The source code is meant to serve as a boilerplate for your application. You are encouraged to start editing the source files to tailor the application to your needs.

Here is the breakdown of the folders in this project:

### `./js`

All _JS_ source codes. The entry point to the application is `./js/index.js`.

### `./js/config`

This application introduces various JSON configuration files for quick application customization.
Note that everything you configure here using JSON can be also done programmatically using the JointJS API.

- `stencil.js` - define groups and shapes in the element palette on the left
- `inspector.js` - define inputs in the property editor on the right
- `toolbar.js` - add/remove toolbar tools in the toolbar at the top
- `halo.js` - add/remove element tools
- `selection.js` - add/remove selection tools
- `sample-graph.js` - JSON (serialized) representation of the default graph shown on startup

### `./js/shapes`

The application uses built-in shapes and introduces several custom ones.

Note that in _JointJS_ terminology, the `graph` (model for a `paper` or canvas) contains of `cells` (shapes). A `cell` is either an `element` (node) or a `link` (edge).

- `elements.js` - if you want to introduce a new custom element to your app, this is the place to do it.
- `links.js` - if you want to introduce a new custom link to your app or modify the default link, check out this file.
- `navigator.js` - custom element view that renders simplified shapes inside the navigator.

### `./js/views`

The application organizes its interfaces into logical views.

- `main.js` - the main application view that initializes the application components and configures the interactions.
- `theme-picker.js` - the theme picker is a small widget that allows the user to choose from several themes.

### `./assets`

Static files (e.g fonts, icons) served from the local server to the browser.

### `./css`

Various CSS stylesheets.
