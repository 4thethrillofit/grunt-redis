This is a fork of [Blooie's grunt-redis](https://github.com/Blooie/grunt-redis) task (see readme below). This fork allows the user to specify a manifest key and max size so the deploy keys are stored in the same redis instance as all previous deploys.

See see my (blog post)[https://medium.com/@feifanw/df40cf105622] on zero-downtime Javascript app deployment for more detail.

# grunt-redis-manifest

> Redis file uploader

## Introduction
This package is inspired by [Luke Melia's](https://twitter.com/lukemelia) [slides about deploying javascript](https://speakerdeck.com/lukemelia/lightning-fast-deployment-of-your-rails-backed-javascript-app) mainly because there wasn't a way to upload a file using grunt.

This is a reasonably basic grunt plugin, with very little documentation but it works! PRs and Feature Requests welcome.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-redis-manifest --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-redis-manifest');
```

## The "redis" task

### Overview
In your project's Gruntfile, add a section named `redis` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  redis: {
    options: {
      manifestKey: String,
      manifestSize: Number,
      fullPath: Boolean,
      prefix: String,
      host: String,
      port: Number,
      connectionOptions: Object //as per https://github.com/mranney/node_redis#rediscreateclientport-host-options
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
