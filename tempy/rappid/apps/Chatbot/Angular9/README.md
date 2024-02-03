# Chatbot Angular9 Typescript

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Project setup

Demo requires `Node.js` and `npm`

## Development server

### Node <= 16

For node versions less than or equal to v16, use the following installation instructions.

```
npm install
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Node >= 17

Due to a [breaking change in node 17][https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported/73465262#73465262],
if using a node version greater than or equal to v17, you will need to adapt the npm scripts in `package.json` in the following manner:

#### macOS & Linux
```
"start": "export NODE_OPTIONS=--openssl-legacy-provider && ng serve"
```

#### Windows
```
"start": "set NODE_OPTIONS=--openssl-legacy-provider && ng serve"
```

This applies to all npm scripts such as `build`, `test`, etc.

After updating the npm scripts, continue with the same installation instructions as above.

```
npm install
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Testing

Angular `9` is no longer a [supported version](https://angular.io/guide/releases#actively-supported-versions) of Angular. As a result,
attempting to run tests with `node` versions greater than `14` can result in an error. You can find more information at the following links:

- [Angular CLI Github issue](https://github.com/angular/angular-cli/issues/20625)
- [Related StackOverflow question](https://stackoverflow.com/questions/64752689/karma-server-typeerror-cannot-read-property-range-of-undefined-angular-u)

In order to run tests successfully in this repository, you should use `node` version `14` which is recommended. If running the tests with `node@14`,
you don't need to adapt the `npm` script as mentioned above.

In general, it is recommended to update to a newer, supported version of Angular.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
