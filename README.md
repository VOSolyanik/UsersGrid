# UsersGrid

Install
-------

In order to be able to install all necessary packages, we need [npm](https://www.npmjs.com/), which comes with
[node.js](https://nodejs.org/). To verify `npm` is installed, run:

```
npm -v
```

In case `npm` is not installed, you may use this
[installing Node.js and updating npm](https://docs.npmjs.com/getting-started/installing-node).

Now you can install `bower` and `gulp`:

```
sudo npm -g install gulp bower
```

Build
-----

Install npm modules:

```
npm install
```

As a result, `node_modules` folder will appear. It will contain plugins, that may be used by task runner `gulp`.
You may find full list of modules at [package.json](package.json).

Install bower-components:

```
bower install
```

As a result, `bower_components` folder will appear. It will contain components needed by the app.

Full list of used components you may find at [bower.json](bower.json). To include component into the app, you have to
include path to it at [config.json](config.json).

You can build project now:

```
gulp dist
```

As result, 'dist' folder will appear. All sources are minified and concatenated.

To make changes at `src` folder reflect dynamically at `dist` folder on the fly, without necessity run `gulp dist`
each time file is edited, use:

```
gulp
```

To know more about code style-guide, used here, see https://github.com/johnpapa/angularjs-styleguide.

