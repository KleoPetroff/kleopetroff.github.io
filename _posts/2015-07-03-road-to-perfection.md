---
layout: post
title: 100/100 PageSpeed - the road to perfection
description: How one month of head bashing, keyboard smashing and a huge amount of coffee was enough to achieve the orgasmic result of 100/100 PageSpeed.
language: en
---

From the beginning, my idea was to develop a simple, minimalistic and **fast** personal website, that suit my needs. I had all the necessary tools, knowledge and motivation to create it. The challenging part was that I needed to finish it in only 30 days, while still doing my day job.

Inspired by the idea behind [Launch In 30 challange](https://www.youtube.com/watch?v=hwSkyishkjI), I started developing this website, exactly one month ago and on June 30, I successfully deployed the project. There are still things that need to be polished, but the results I accomplished are more than satisfying.  

The most challenging part was the optimization. I didn't want to make any exceptions, as I was after the perfect score in PageSpeed. One month of head bashing, keyboard smashing and a huge amount of coffee was enough to achieve the orgasmic result of 100/100 PageSpeed.

![User Experience](http://i.imgur.com/Iz9Wd9h.png)

![Mobile PageSpeed](http://i.imgur.com/WlIydK8.png)

![Desktop PageSpeed](http://i.imgur.com/fLzKcaF.png)

I cannot express the satisfaction seeing this for the first time. It was like a miracle come true, so let me share with you the whole process.

##Minify EVERYTHING

I used [Gulp](http://gulpjs.com/) as a build system (I <span class="love">&#9829;</span> Gulp!), mostly for minifying and concatenating my CSS files. With the help of [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) and [gulp-concat-css](https://www.npmjs.com/package/gulp-concat-css) I was able to spare myself from most of the tedious repetitive tasks. Google PageSpeed was more than happy to see only one minified CSS file in my project. 

Minifying the HTML was a bit tricky though. I could've used another Gulp plugin called [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin), but I wanted more elegant solution. And I found one. A fellow programmer, [Anatol Broder](http://anatol.penibelst.de/), have created a Jekyll layout template that compress all other Jekyll pages. The integration was pretty straightforward - I just had to add the compress.html inside my `_layouts` folder and use it as a layout for my `default.html` page. The result - every single page is minified and compressed. Link to the awesome [compress.html](http://jch.penibelst.de).


## The strange story of image optimization

In the beginning, I used [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin/) for my image optimization, but I found that [compress.io](http://compress.io) do a lot better job. The only downside was I had to compress every single image one by one, although the average compression rate was about 75-80%.

## Leverage browser caching - mission (almost)impossible 

Github Pages don't support any caching policy (what a pity), so I thought I just have to accept that face, but after some research I found a great solution - [CloudFlare.com](https://www.cloudflare.com). CloudFlare acts as both a DNS host and a proxy for the site. They provide several CDN and minification tools to speed up my site even more, but most importantly - **it's totally free**! I set up my domain, played with the options and voila - no more cache headache!

The last problem with the cache arose when I decided to add Google Analytics. As an external script, CloudFlare couldn't cached it at all. Thankfully, I found a clever solution for this - downloading the analytics javascript and loading it from the project as a local file.

> "But what if Google decide to update their script, do I need to upload the script everyday?" - I asked myself
>
> "No" - Stackoverflow answered
 
Google update their analytics javascript only a few times a year, judging from their [Analytics Changelog  Page](https://developers.google.com/analytics/devguides/collection/analyticsjs/changelog), so I set up a new recipe in IFTTT. Every time the script is updated I will receive a warning mail. If you are using the same approach, feel free to use my IFTTT recipe:

<a href="https://ifttt.com/view_embed_recipe/304686-analytics-js-update-send-mail" target = "_blank" class="embed_recipe embed_recipe-l_31" id= "embed_recipe-304686"><img src= 'https://ifttt.com/recipe_embed_img/304686' alt="IFTTT Recipe: analytics.js update - send mail connects feed to email" width="370px" style="max-width:100%"/></a><script async type="text/javascript" src= "//ifttt.com/assets/embed_recipe.js"></script>

## Eliminating render-blocking CSS and Javascript

Every CSS file, loaded the normal way, slows down the page rendering. Fixing this problem was quite easy though - I had to load the CSS after rendering the page:


{% highlight javascript linenos %}
      var cb = function() {
        var l = document.createElement('link'); l.rel = 'stylesheet';
        l.href = '/assets/css/styles.min.css';
        var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
          webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(cb);
      else window.addEventListener('load', cb);
{% endhighlight %}
	
This solution worked great, but another problem arose - I had an User Experience warning, telling me that the navigation links were too close to each other. I had to include part of the CSS directly in the `<head>`.
 
 {% highlight css linenos %}
.navigation li,
.contact-list li {
    padding: 0 0 1rem;
}

 {% endhighlight %}

Rendering - check!

## Conclusion 

It was a bumpy ride,but the satisfaction of fixing these problems and seeing the actual results was so enjoyable and probably the most fun part of the whole development process. I can go to bed now, knowing my website OK.