# grunt-image-check

> Verify that your images are correctly resized for different resolutions

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-check');
```

## The "image_check" task

### Overview
In your project's Gruntfile, add a section named `image_check` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  image_check: {
    your_target: {
      // Target-specific options
    },
  },
});
```

### Options

#### options.baseline
Type: `String`

Path to a folder where the images that are going to be used as baseline live

#### options.strict
Type: `Boolean`
Default value: `false`

If this is set to true, the script will fail if any image from the baseline is not present on the folders you are comparing against or if there is a file in the folders you are comparing and it doesn't exist in the baseline

#### options.compare
Type: `Array`

Array of objects representing the folders you want to compare against. The format of the object is:

```js
{
  path: 'Path to the folder where the resized images live',
  proportion: 'Proportion you expect images in the given path to have compared to the baseline. If it is 2, then you expect images to be twice as large.
}
```

### Usage Examples

#### Check for images double the size

```js
grunt.initConfig({
  image_check: {
    retina: {
      baseline: 'images/1x/'
      strict: true,
      compare: [
        {
          path: 'images/2x/',
          proportion: 2
        }
      ]
    }
  },
});
```
