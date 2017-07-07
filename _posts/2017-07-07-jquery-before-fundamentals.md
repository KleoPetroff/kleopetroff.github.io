---
title: Learning jQuery before JavaScript
date: 2017-07-07 00:00:00 Z
description: Skipping fundamentals in favor of tools
layout: post
---

I've seen this question asked a lot. From [Quora](https://www.quora.com/I-am-learning-web-development-Should-I-learn-jQuery), through [StackOverflow](https://stackoverflow.com/questions/1095682/learning-javascript-should-i-skip-straight-to-the-good-stuff-the-frameworks), to [Hashnode](https://hashnode.com/post/what-languages-frameworks-and-libraries-should-i-learn-in-order-to-start-front-end-development-citivokyr0rqe9o53ewo86v3g) and I understand why - jQuery has a gradual learning curve, provide a great API with an arsenal of methods and it's beginner's friendly. But is it worth it skipping the fundamentals and jumping right into the library wagon? Let's find out.

## The rise of jQuery

jQuery was created to simplify DOM manipulation through easy to use, cross-browser API. It may be tempting for a beginner to learn jQuery, because the library makes working with the DOM so pleasing:

jQuery:

```javascript
$(el).fadeIn();
```
Vanilla:

```javascript
function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

fadeIn(el);
```

For everyone new to JavaScript, the second example will look confusing and bewildering. But this is only because of the abstraction level jQuery provides. You can think of it as an iceberg - you see only the top of the iceberg, the small, beautiful part of it. But beneath it, there is an enormous piece of ice, hidden from our eyes.

jQuery is powerful! It's a great library, used by Google, Yahoo, Quora and many more and it's tempting for a beginner programmer to simply include it in his project and start using it. But that creates an illusion, a false feeling of achievement. By learning an abstraction, you are skipping the most important part of learning. And that is **fundamentals**.

## Learn the basics

You possibly heard this a million times. Before jumping to any framework or library, learn the fundamentals. Learn pure JavaScript. It's OK to learn ECMAScript 6 in the process, it's actually a good idea to do so, but don't start learning React, Angular, jQuery or any other before having a strong foundation.

I've written a post on Hashnode, explaining how exactly my learning journey went

<blockquote class="embedly-card"><h4><a href="https://hashnode.com/post/zero-to-one-how-i-mastered-javascript-and-how-you-can-too-ciuwmrw9j00r50q539clhhdj7">Zero to One: How I mastered JavaScript and how you can too - Hashnode</a></h4><p>JavaScript is everywhere these days - from web apps to mobile applications and servers. Its popularity skyrocketed in the last few years, surpassing langua.</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

[@Marco Alca](https://twitter.com/minecrawlerx) wrote another post about vanilla JavaScript vs JS libraries, which you should definitely check.

<blockquote class="embedly-card"><h4><a href="https://hashnode.com/post/vanilla-javascript-vs-frameworks-and-libraries-finding-a-good-balance-civ1zfus90pphdc53q8vtakz5">Vanilla JavaScript vs. Frameworks & Libraries - Finding a good balance - Hashnode</a></h4><p>Did you ever wonder, "Which JS framework should I use?". There are so many, and all of them want to help you build awesome web applications. Wouldn't it be great to merge them all into a single piece of awesomeness? Well, meet me, who has a slightly different opinion! ATTENTION!</p></blockquote>
<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>

I have been tempted, more than I should, to start learning some new, awesome and promising library, but I resisted the temptation. You know why? Because libraries and frameworks fade, but knowledge doesn't.

**Learn the fundamentals, have a strong foundation, become prolific JavaScript developer and just then think about what tool to learn.**

## Let's talk about Performance

jQuery ease of writing comes with its cost. Remember the example from before? The JavaScript example is 93% faster than the jQuery equivalent and here is the proof - [jsperf-fadein-vs-native](https://jsperf.com/fadein-to-native/1)

Almost everything jQuery does, JavaScript does it faster. It may look that you are writing more code when using vanilla JavaScript, but that is not entirely true. Let's see how jQuery's fadeIn method looks like under the hood:

```javascript
function (speed, easing, callback) {
    return this.animate(props, speed, easing, callback);
}
```

Well, that doesn't seems too bad. One line of code. But what's inside `this.animate`?

```javascript
function (prop, speed, easing, callback) {
    var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function () {

        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation(this, jQuery.extend({},
        prop), optall);

        // Empty animations, or finishing resolves immediately
        if (empty || dataPriv.get(this, "finish")) {
            anim.stop(true);
        }
    };
    doAnimation.finish = doAnimation;

    return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
}
```

Now that is something! You can see how more operations the fadeIn method does, compared to our JavaScript example. This is where the difference in speed comes from.

## The Library Trap

I like to call a person who invest most of its time learning a library or a framework, a "tool prisoner". I've been a tool prisoner once in my life. I started learning Backbone.js. It was a promising framework, used by several big companies. I've invested 3-4 months learning it. Right now, I cannot monetize my time learning Backbone anywhere. As of 2017, Backbone is on a steady decline and here is the global interest drop:

![Backbone.js trends](http://i.imgur.com/roqc4G7.png)

Looking from the financial side, these 4 months were tragic. On the contrary though, I have learned a valuable lesson - **libraries and frameworks fade, fundamental knowledge doesn't**.