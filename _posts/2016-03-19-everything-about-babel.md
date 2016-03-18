---
layout: post
title: Everything you need to know about BabelJS
description: Babel is becoming the de-facto tool for compiling new ES6/ES7 code to browser usable code. Here is all you need to know to become comfortable with Babel.  
---

[Babel](https://babeljs.io) is a tool for transpiling (compile) ES6/ES7 code to ECMAScript 5 code, which can be used **today** in any modern browser. Even more - Babel has extensions for transpiling JSX for React and Flow syntax for static type checking.
    
Babel is composed of different small modules. Out of the box, Babel doesn't do anything. It uses presets for compiling the code, which we will cover later on.
 
### babel-cli

Babel CLI is a tool for transpiling the code through the command line. While you can install it globally, using `npm install babel-cli -g`, it's recommended to install it locally project by project with `npm install babel-cli --save-dev`.

There are two main advantages for this:

1. Different projects on the same machine can depend on different versions of Babel. 
2. You don't have implicit dependency on the dev environment you are working on. Your project will be way more portable and maintainable.

After installing `babel-cli` and saved it as a dev dependency, you can run the following commands from the terminal: 

{% highlight bash %}
babel example.js --out-file compiled.js
{% endhighlight %}

Let's see what every piece of the command does:

- `babel` - calling Babel
- `example.js` - the input ES6/ES7 file
- `--out-file` - the option passed to Babel for compiling a file. We can also use `--out-dir` for compiling all files in a directory. The short versions of the options are `-o` for `--out-file` and `-d` for `--output-dir`
- `compiled.js` - the output file 

Typing the command every time you make a change can be a tedious work. We can automate the process using npm scripts. In you `package.json`, add a new _build_ task: 

{% highlight javascript %}
{
    ...
    "scripts": {
        "build": "babel ./src -d ./lib -w"
    }
    ...
}
{% endhighlight %}

So now, you can run the script from the command line using `npm run build`. The `-w` option in the script instructs npm to watch for changes in the `src` folder. Every time you make a change to a file in `src`, Babel will transpile the code and save it in the `lib` folder with the same name.

## babel-register

`babel-register` is a require hook, that will bind node's `require` method and automatically transpile the file on the fly. **This is not meant for production!** It's considered a bad practice to compile the code this way. It's far better to compile the code before deploying. 

However this works quite well for  development purposes.

Let's install `babel-register` first:

{% highlight bash %}
npm install babel-register --save-dev
{% endhighlight %}

Create a simple `index.js` file:

{% highlight javascript %}
console.log('Hello Babel');
{% endhighlight %}

and require index.js:
 
{% highlight javascript %}
require('babel-register');
require('index.js');
{% endhighlight %}

When you run the code using `node register.js` you will see the output of `index.js` - `"Hello World"`.

**Note**: You can't require in the same file that you want to compile, because Node is executing the file before Babel's transile.

### babel-node

For running some code via the command line the easiest way to integrate Babel is to use `babel-node` CLI, which is a replacement of node CLI.

**This is also not meant for production use!**
 
`babel-node` comes with `babel-cli`, so make sure you have it installed first.

Then you can simply replace `node` with `babel-node`:

{% highlight bash %}
babel-node register.js
{% endhighlight %}


The returned result will be again `"Hello World"`.

## Configuring Babel

As mentioned earlier, Babel doesn't transpile any code without explicitly telling it what to do. It just moves the files from one place to another. 

You can give Babel instructions on what to do by installing plugins and presets.

### .babelrc

The `.babelrc` file is the configuration file for Babel. Start off with it like this:

{% highlight javascript %}
{
    "presets": [],
    "plugins": []
}
{% endhighlight %}

Let's start telling Babel to transpile ES6 code to ES5. We do this by using the es2015 preset:

{% highlight bash %}
npm install babel-preset-es2015 --save-dev
{% endhighlight %}

Modify `.babelrc` and add the preset: 

{% highlight javascript %}
{
    "presets": ["es2015"],
    "plugins": []
}
{% endhighlight %}

Setting up React is just as easy: 

{% highlight bash %}
npm install babel-preset-react --save-dev
{% endhighlight %}

{% highlight javascript %}
{
    "presets": ["es2015", "react"],
    "plugins": []
}
{% endhighlight %}

JavaScript has some proposals for new features that are not yet finalized. They are separated into 5 states (0 to 4). As proposals gain more traction and are more likely to be accepted into the standard they proceed through the various stages, finally being accepted into the standard at stage 4.

In Babel, these changes are bundled in 4 different presets: 

- `babel-preset-stage-0`
- `babel-preset-stage-1`
- `babel-preset-stage-2`
- `babel-preset-stage-3`

There is no `babel-preset-stage-4` as it's simply `babel-preset-es2015`.

Each of these presets requires the later preset. For example `babel-preset-stage-1` requires `babel-preset-stage-2` and `babel-preset-stage-3`.

Simply install the stage you want to use:

{% highlight bash %}
npm install babel-preset-stage-2
{% endhighlight %}

Then add it to Babel config file:

{% highlight javascript %}
{
    "presets": ["es2015", "react", "stage-2"],
    "plugins": []
}
{% endhighlight %}

### babel-polyfill

`babel-polyfill` will emulate a full ES6 environment. For example, without the polyfill, the following code:

{% highlight javascript %}
function allAdd() {
    return Array.from(arguments).map((a) => a + 2);
}
{% endhighlight %}

will be transpiled to:

{% highlight javascript %}
function allAdd() {
    return Array.from(argument).map(function (a) {
        return a + 2;
    });
}
{% endhighlight %}

This code will not work everywhere, because `Array.from` in not supported by every browser:

{% highlight bash %}
Uncaught TypeError: Array.from is not a function
{% endhighlight %}

To solve this problem we need to use a polyfill. A polyfill is a piece of code, that replicate the native API that does not exist in the current runtime. Babel uses [core-js](https://github.com/zloirock/core-js) as it's polyfill and [regenerator](https://github.com/facebook/regenerator) for its generators and async functions.

To include the Babel polyfill, we need to install it:

{% highlight bash %}
npm install babel-polyfill --save-dev
{% endhighlight %}

Then, simply include the polyfill at the top of any file that requires it:

{% highlight javascript %}
import 'babel-polyfill';
{% endhighlight %}

## Advanced Babel Configuration

Most people can get by using the build-in presets, but Babel exposes much more power than that.

### Specify plugins manually

Babel presets are just collections of pre-configured plugins. You can manually add plugins if you want to do something different. 
 
Let's say for example that you want to use [JavaScript Decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md). You need to install the decorators plugin:

{% highlight bash %}
npm install transform-decorators --save-dev
{% endhighlight %}

and add it in `.babelrc`: 

{% highlight javascript %}
{
  "presets": ["es2015"],
  "plugins": ["transform-decorators"]
}
{% endhighlight %}
 
For a full list of official plugins see [Babel Plugins](http://babeljs.io/docs/plugins/). Also you can check the npm registry for [community build plugins](https://www.npmjs.com/search?q=babel-plugin).
 
Some plugins have also has options to configure. For example, many transforms have a "loose" mode which drops some spec behavior in favor of simpler and more performant generated code.
  
{% highlight javascript %}
{
   ...
   plugins:  ["transform-es2015-classes", { "loose": true }]
   ...
}
{% endhighlight %}

### Customizing Babel based on environment
 
Babel has plugins that can help you in the development process, as plugins for optimizing code for production. You can configure which plugins to load, based on the environment you are:

{% highlight javascript %}
{
    "presets": ["es2015],
    "env": {
        "development": {
            "plugins": [...]
        },
        "production": {
            "plugins": [...]
        }
    }
}
{% endhighlight %}

The current environment will use `process.env.BABEL_ENV`. If `BABEL_ENV` is not present, it will use `process.env.NODE_ENV`. If `NODE_ENV` is not available too, it will default to `development`.

Setting project environment is done differently on Unix and Windows systems.

_Unix_:

{% highlight bash %}
$ BABEL_ENV=development
$ NODE_ENV=development
{% endhighlight %}

_Windows_:

{% highlight bash %}
$ SET BABEL_ENV=development
$ SET NODE_ENV=development
{% endhighlight %}

It's a good idea to use [cross-env](https://www.npmjs.com/package/cross-env) - a npm package which allows you to provide a script which sets an environment using unix style and have it work on windows too.

## Own Presets 

Writing the same configurations again and again seems like a ton of work. That's why you can create your own presets. 

Say you have the following `.babelrc`: 

{% highlight javascript %}
{
  "presets": ["es2015", "react"],
  "plugins": ["transform-decorators"]
}
{% endhighlight %}

All you need to do is name the project folder `babel-preset-*` and create two files:

A `package.json` file with the `dependencies` for the preset:

{% highlight javascript %}
{
  "name": "babel-preset-awesome",
  "version": "1.0.0",
  "author": "Kliment Petrov <kleopetroff@gmail.com> (http://kleopetrov.me)",
  "dependencies": {
    "babel-preset-es2015": "^6.3.13",
    "babel-preset-react": "^6.3.13",
    "babel-plugin-transform-decorators": "^6.6.5",
  }
}
{% endhighlight %}

Then, create an `index.js` that exports the context of `.babelrc`, replacing the presets and plugins string with `require` calls:

{% highlight javascript %}
module.exports {
    {
        presets: [
            require("es2015"),
            require("react")
        ],
        plugins: [
            require("transform-decorators")
        ]
    }
}
{% endhighlight %}

Then simply publish it to the npm registry.

## Other Tools

Babel can be set up to work with other tools like linting and code style.

### Linting

One of the most popular linting tools is [ESLint](http://eslint.org/). Babel provides an official integration. You need to install:
 
{% highlight javascript %}
npm install eslint babel-eslint --save-dev
{% endhighlight %}

Next, create the `.eslintrc` in your project and set the `parser` to `babel-eslint`: 

{% highlight javascript %}
{
    "parser": "babel-eslint",
    "rules": {
    ...
    }
}
{% endhighlight %}

You can then easily add a new npm task in your `package.json`:

{% highlight javascript %}
{
    ...
    "scripts": {
        "lint": "eslint ./src/*.js*"
    }
    ...
}
{% endhighlight %}
 
In the command you can type `npm run lint`.

### Editors

With the growing popularity of Babel, more and more editors provide support for it trough addons:

- [Sublime Text](https://github.com/babel/babel-sublime)
- [Webstorm](https://babeljs.io/docs/setup/#webstorm)
- [Atom](https://atom.io/packages/language-babel)
- [vim](https://github.com/jbgutierrez/vim-babel)

## Conclusion

Babel and its surrounding ecosystem is playing an essential role for today's modern web applications. With the provided information above, you should be ready to start using the latest JavaScript specs and accompanied technologies (JSX, Flow, etc.) from now on. Keep calm and code on!  