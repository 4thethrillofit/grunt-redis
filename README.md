# grunt-redis

> Redis file uploader

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-redis --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-redis');
```

## The "redis" task

### Overview
In your project's Gruntfile, add a section named `redis` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  redis: {
    options: {
      fullPath: Boolean, 
      prefix: String
    },
    your_target: {
      files: {
        src : ["src/index.html"]
      }
    },
  },
});
```

### Options

#### options.fullPath
Type: `Boolean`
Default value: false

True if you want the full src file path as the redis key, otherwise only use the path.basename() i.e. just the file name

#### options.prefix
Type: `String`
Default value: ''

prefix all your keys with this

### Usage Examples

#### Default Options
```js
grunt.initConfig({
  redis: {
    options: {
      fullPath: true, 
      prefix: 'grunt:'
    },
    default: {
      files: {
        src : ["src/index.html"]
      }
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
