---
title: Backbone.js Models Explained
date: 2015-12-07 00:00:00 Z
layout: post
description: Models are the heart of any JavaScript application, containing the interactive
  data as well as a large part of the logic surrounding it - conversions, validations,
  computed properties, and access control.
---

Backbone models contain data for an application as well as the logic, for example a todo item including its attributes like title, completed etc.

Models are created by extending `Backbone.Model` as follows:

```js
var Todo = Backbone.Model.extend({});

var todo1 = new Todo();

console.log(JSON.stringify(todo1)) // will log {}

var todo2 = new Todo({
    title: 'Check the console',
    completed: true
});

console.log(JSON.stringify(todo2)) // will log the object {"title": "Check the console", "completed": true }

```

## Initialization

The `initialize()` method is called when a new instance of the model is created. Its use is optional.

```js
var Todo = Backbone.Model.extend({
    initilize: function() {
        console.log('This model has been initialized');
    }
});

var todo1 = new Todo() // will logs "This model has been initialized."
```

## Default Values

There are times when we want to set default values to our models (in a scenario where a complete set of data isn’t provided by the user). This can be set using a property called `defaults` in your model:

```js
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var todo1 = new Todo();

console.log(JSON.stringify(todo1)); // { "title": "", "completed": false }

var todo2 = new Todo({
    title: 'This is a new Todo'
});

console.log(JSON.stringify(todo2)); // { "title": "This is a new Todo", "completed": false }

var todo3 = new Todo({
    title: 'This is another Todo',
    completed: true
});

console.log(JSON.stringify(todo3)); // { "title": "This is another Todo", "completed": true }
```

## Getters and Setters

`Model.get` provides easy access to the model’s attributes.

```js
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var todo = new Todo();

console.log(todo.get('title')) // will log "" - empty string
console.log(todo.get('completed') // will log false

var todo2 = new Todo({
    title: 'This is a Todo', 
    completed: true
});

console.log(todo2.get('title')) // Will log "This is a Todo"
console.log(todo2.get('completed')) // will log true
```

If you need to read or clone all of the model’s attributes, use its `toJSON()` method. This method returns a copy of all attributes of the object:

```js
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var todo1 = new Todo();
console.log(todo1.toJSON()); // logs { "title": "", "completed": false }
```

### Model.set()

`Model.set()` sets a hash containing one or more attributes on the model. When any of these attributes alter the state of the model, a ‘change’ event is triggered. Changed events for each attribute are also triggered and can be bound to (e.g \`change:name\`, \`change:title\`).

```js
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var todo1 = new Todo({
    title: 'Set through instantiation'
});

console.log(todo1.get('title')); // logs "Set through instantiation"

todo1.set('title', 'This is the changed title');
console.log(todo1.get('title')); // logs "This is the changed title"
```

## Direct access

Models expose an `.attributes` attribute which represents an internal hash containing the state of that model. This is generally in the form of a JSON object similar to the model data.

Setting values through the `.attributes` attribute on a model bypasses triggers bound to the model.

Passing `{silent: true}` on set doesn’t delay individual `“change:attr”` events. Instead they are silenced entirely:

```js
var Person = new Backbone.Model();

Person.on('change:name', function() {
    console.log('Name changed');
});

Person.set({name: 'Jeremy'}, {silent: true}); // no entry will be loged

console.log(Person.hasChanged('name')); // true - change was recorded
console.log(Person.hasChanged(null)); // true - something/anything has changed
```

**Where possible it is best practice to use Model.set(), or direct instantiation as explained earlier**

## Listening for model changes

If you want to receive a notification when a Backbone model changes you can bind a listener to the model for its change event. A convenient place to add listeners is the `initialize()` function as shown below:

```js
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },
   
    initialize: function() {
        console.log('This model has been initialized');
        this.on('change', function() {
            console.log('Value for this model have changed.');
        });
    }
});

var todo1 = new Todo();

todo1.set('title', 'This is a Todo');
console.log('Title has changed: ' + todo1.get('title')) //will log "Title has changed: This is a Todo"

todo.set('completed', true);

// Above will log:
"This model has been initialized"
"Title has changed: This is a Todo"
"Value for this model have changed."
"Value for this model have changed."
```

We can also listen for changes to individual attributes in a Backbone model:

```js
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },
    initialize: function() {
        console.log('This model has been initialized.');
        this.on('change:title', function() {
            console.log('The title has been changed.');
        })
    },

    setTitle: function(newTitle) {
        this.set('title', newTitle);
    }
});

var todo1 = new Todo();
todo1.setTitle('Go fishing');
todo1.set({ title: 'New todo task'});

Above will log:

"This model has been initialized."
"The title has been changed." - title is currently "Go fishing"
"The title has been changed." - title is currently "New todo task"
```

## Validation

Backbone supports model validation through `model.validate()`, which allows checking the attribute values for a model prior to setting them. By default, validation occurs when the model is persisted using `save()` method or when `set()` is called if `{validate: true}` is passed as an argument.

```js
var Person = new Backbone.Model({name: 'Jeremy'});

Person.validate = function(attr) {
    if (!attr.name) return 'I need your name';
};

Person.set({name: 'Samuel'});
console.log(Persone.get('name')); // will log "Samuel"

Person.unset('name' {validate: true}) // false
```

Above, we also use the `unset()` method, which removes an attribute by deleting it from the internal model attributes hash.

Validation functions can be as simple or complex as necessary.If the attributes provided are valid, nothing should be returned from `validate()`. If they are invalid, an error value should be returned instead:

- An `invalid` event will be triggered, setting the `validationError` property on the model with the value which is returned by this method.
- `save()` will not continue and the attributes of the model will not be modified on the server.

```js
var Todo = Backbone.Model.extend({
    defaults: {
        completed: false
    },

    validate: function(attributes) {
        if(attributes.title === undefined) return 'Remember to set a title.'
    },

    initialize: function() {
        console.log('The model has been initialized');
        this.on('invalid', function(model, error) {
            console.log(error);
        })
    }
});

var todo1 = new Todo();
todo1.set('completed', true, {validate: true}) // will log "Remember to set a title."
console.log(todo1.get('completed')) // false
```
