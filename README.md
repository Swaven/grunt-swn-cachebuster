# grunt-swn-cachebuster

> Appends timestamp param to import urls

## Getting Started
This plugin requires Grunt `>=0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swn-cachebuster --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swn-cachebuster');
```

## The "cachebuster" task

### Overview

This task looks into source files, and edits all html and js file urls to append a timestamp query string parameter. It ignores urls that start with  */bower_components*.

In your project's Gruntfile, add a section named `cachebuster` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cachebuster: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Usage Examples

```js
grunt.initConfig({
  cachebuster: {
    all: {
      expand: true,
      cwd: 'assets/',
      src: ['*.html', 'elements/**/*.html', '!build/', 'elements/swn-app/swn-app.js'],
      dest: 'assets/build/'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
