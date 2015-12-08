---
layout: post
title: Backbone.js Views Explained
description: Backbone views are used to reflect what your applications' data models look like. They are also used to listen to events and react accordingly.
---

Backbone Views don't contain HTML for our application, but the logic behind the presentation of the models. This is usually achieved using JS templates like Underscore templates, Mustache, Handlebars etc. 

A view's `render()` method can be bound to a model's `change()` event, enabling the view to instantly reflect model changes without requiring a full page refresh.

## Creating new views

Creating a new view is similar to creating a new model we need to extend `Backbone.View`:

{% highlight javascript %}
var TodoView = Backbone.View.extend({
    tagName: 'span',
    
    todoTpl = _.template('Example template'),
    
    events: {
        'dbclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    }
    
    render: function() {
            this.$el.html(this.todoTpl(this.model.attributes))
            this.input = this.$('.edit');
            
            return this;
    },
    
    edit: function() {
        // functionality for double click
    },
    
    close: function() {
        // functionality for blur
    },
    
    updateOnEnter: function() {
        // functionality for keypress
    }
});

var todoView = new TodoView();

console.log(todoView.el) // will log <li></li>
{% endhighlight %}

## What is `el` ?

`el` is a central property of a view. It's basically a reference to a DOM element and all views must have one. 

There are two ways to associate a DOM element with a view - a new element can be created for a view and afterward added to the DOM or a reference can be made to an element which already exist in the page.

We can set a combination of the properties `tagName`, `className` and `id` on the view. If nothing is specified `tagName` will be set by default to `div`.

In the example above, the `tagName` is set to "li", so a li element is created. Let's see another example:

{% highlight javascript %}
var TodoView = Backbone.View.extend({
    tagName: 'ul', // required, but defaults to div
    
    className: 'todo-list', // optional, we can assign multiple classes to the property
    
    id: 'todo' // optional
});

var todoView = new TodoView();
console.log(todoView.el) // will log <ul class="todo-list" id="todo"></ul>
{% endhighlight %}

The above code creates a new DOM element but doesn't append it to the DOM. If the element exist in the page, we can set a `el` property to the view as a CSS selector that matches the element.
 
`el: "#header"`

Alternatively, we can set `el` to an existing element when creating a new view:
 
`var todoView = new TodoView({ el: '#header' });`

**Note:** When declaring a View, `options`, `el`, `tagName`, `className` and `id` may be defined as functions, if we want their values to be determined at runtime.

## setElement

If we need to apply an existing Backbone view to a different DOM element `setElement` can be used. Overriding `this.el` needs to both change the DOM reference and re-bing the event to the new element, as well as unbind them from old one.

`setElement` will create a cached `$el` reference for us, moving the delegated events of the view from the old to the new one.

{% highlight javascript %}
// Create two DOM elements in memory
var button1 = $('<button>Button 1</button>');
var button2 = $('<button>Button 2</button>');

// Define a new View
var TodoView = Backbone.View.extend({
    events: {
        'click': function(e) {
            console.log(view.el === e.target);
        }
    }
})

// Instantiate a new view
var todoView = new TodoView({ el: button1 });

// Apply the view to button2
todoView.setElement(button2);

button1.trigger('click'); //
button2.trigger('click'); // will return true
{% endhighlight %}

## Understanding `render()`

`render()` is a optional function that defines the logic for rendering a template. Here is an example using Underscore micro-templating:

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
</head>
    <body>
        <div id="todo"></div>
        
        <script type="text/template" id="item-template">
            <div>
                <input id="todo_complete" type="checkbox" <%= completed ? 'checked: "checked"' ? '' %>>
                <% title %>
            </div>
        </script>
    
        <script src="underscore-min.js"></script>
        <script src="backbone-min.js"></script>
        <script src="jquery-min.js"></script>
        <script src="app.js"></script>
    <body>
</html>
{% endhighlight %}

The `_.template` method in Underscore compiles Javascript templates into functions which can be evaluated for rendering. In the TodoView, we're passing the markup from the template with id `item-template` to `_.template` to be compiled and stored in the todoTpl property.

The `render()` method uses this template by passing it the `toJSON()` method. The template returns its markup after using the model's title and completed flag to evaluate the expressions containing them. 

A common Backbone convention is to return `this` at the end of the `render()`. This is useful for number of reasons:
 
- making views easily reusable in other parent views.
- creating a list of elements without rendering and painting each of them individually, only to be drawn once the entire list populated.

{% highlight javascript %}
var TodoView = Backbone.View.extend({
   /* Compile a template for this view. In this case '...'
    * is a placeholder for a template such as
    * $('$list_template').html() */
   
   template: _.template(...) 
   
   render: function() {
    this.$el.html(this.template(this.model.attributes));
    
    return this;
   }
});
{% endhighlight %}

## The `events` hash

Backbone `events` hash allows us to attach event listeners to either custom selectors, related to `el` or directly to `el` if no selector is provided. An event takes the form of a key-value pair:

`"<eventName> <selecton>" : "<callbackFunction>"`

A number of DOM even-types are supported, including `click`, `submit`, `mouseover`, `dbclick`, etc.

{% highlight javascript %}
var TodoView = Backbone.View.extend({
    tagName: 'li',
    
    events: {
        'click .toggle': 'toggleCompleted',
        'dbclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'click .destroy': 'clear',
    },
    ...
{% endhighlight %}

Backbone uses jQuery's `.delegate()` underneath and further extends it so that `this` always refers to the current view object within callback functions. The only thing to keep in mind is that any string callback supplied to the event must have a corresponding function with the same name within the scope of the view.

We can also bind methods ourselves using `_.bind(this.viewEvent, this)`, which is effectively what the value in each event's key-value pair is doing. Below we use `_.bind` to re-render our view when a model is changed:
 
{% highlight javascript %}
var TodoView = Backbone.View.extend({
    initialize: function() {
        this.model.bind('change', _.bind(this.render, this));
    }
});
{% endhighlight %}

`_.bind` only works on one method at a time, but effectively binds a function to an object so that anytime the function is called the value of this will be the object.