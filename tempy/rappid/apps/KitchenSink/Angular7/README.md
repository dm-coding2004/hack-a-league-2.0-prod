# JointJS+ Demo Application - Angular 7

This application showcases the JointJS+ plugins in action and shows how the plugins
can be combined together. You can use this demo app as a reference for your own application
development.

The application logic is written using [Angular v7][https://angular.io/] and [Typescript][https://www.typescriptlang.org/] while the JointJS is still in JS.

## Running the application

Demo requires `Node.js` and `npm`

### Node <= 16

For node versions less than or equal to v16, use the following installation instructions.

```
npm install
npm start
```

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

## Testing

Angular `7` is no longer a [supported version](https://angular.io/guide/releases#actively-supported-versions) of Angular. As a result,
attempting to run tests with `node` versions greater than `14` can result in an error. You can find more information at the following links:

- [Angular CLI Github issue](https://github.com/angular/angular-cli/issues/20625)
- [Related StackOverflow question](https://stackoverflow.com/questions/64752689/karma-server-typeerror-cannot-read-property-range-of-undefined-angular-u)

In order to run tests successfully in this repository, you should use `node` version `14` which is recommended. If running the tests with `node@14`,
you don't need to adapt the `npm` script as mentioned above.

In general, it is recommended to update to a newer, supported version of Angular.

Due to Same-Origin policy implemented in the majority of browsers to prevent content from being accessed if the file exists on another domain, it is recommended to access the application through a **Web server**. The application might work only partially when viewed from a file-system location.

