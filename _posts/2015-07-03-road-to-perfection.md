---
layout: post
title: 100/100 PageSpeed - the road to perfection
description: How one month of head bashing, keyboard smashing and a huge amount of coffee drinking was enough time to achieve the orgasmic result of 100/100 PageSpeed.
language: en
---

From the beginning of this project, the main idea was to develop a simple, minimalistic and **fast** personal website, that suits my needs. I had all the necessary tools, knowledge and motivation to create it. The challenging part was that I needed to finish the project in 30 days and not a single day more.

Inspired by the idea behind [Launch In 30 challange](https://www.youtube.com/watch?v=hwSkyishkjI), I started developing this website one month ago. 30 days later, I successfully deployed the project. There are still things that needs to be polished, but the results I accomplished with this first version are more than satisfying.  

The most challenging part was the optimization. I didn't want to make any exceptions, as I was after the perfect score. One month of head bashing, keyboard smashing and a huge amount of coffee drinking was enough time to achieve the orgasmic result of 100/100 PageSpeed

![User Experience](http://i.imgur.com/Iz9Wd9h.png)

![Mobile PageSpeed](http://i.imgur.com/WlIydK8.png)

![Desktop PageSpeed](http://i.imgur.com/fLzKcaF.png)

I cannot express the satisfaction of seeing this for the first time. It was like a miracle come true. So let me tell you how I achieve this results.

##Minify EVERYTHING

I used [Gulp](http://gulpjs.com/) as a build system, mostly for minifying and concatenating my CSS files. With the help of [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) and [gulp-concat-css](https://www.npmjs.com/package/gulp-concat-css) I was able to combine and minify all my css files into one big file, whom I load in production. Google PageSpeed is more than happy with that - minifying and less requests to the server - check! 

Minifying the HTML was a bit tricky. I could've used another Gulp plugin called [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin), but I wanted to find more elegant solution. And I did! A fellow programmer, [Anatol Broder](http://anatol.penibelst.de/), created a Jekyll layout template that compress all other Jekyll pages. The integration was pretty straightforward - I just added the compress.html inside my `_layouts` folder and use it as a layout for my `default.html` page. That way, every single page is now minified and compressed. Here is the link to the awesome [compress.html](http://jch.penibelst.de).


## The strange story of image optimization

First, I used [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin/) for my image optimization, but I found that [compress.io](http://compress.io) do a lot better job. The only downside was, I had to compress every image one by one, but the average compression rate was ~75-80%!

## Leverage browser caching - mission (almost)impossible 

Github Pages don't support any caching policy, so I thought I just have to accept the fact nothing can be done. After searching for some kind of solution I found [CloudFlare.com](https://www.cloudflare.com). It acts as both a DNS host and a proxy the site. They provide several CDN and minification tools to speed up this site even more. Most importantly - **it's free**! 

I set up my domain, configure the caching options and voila!

The last problem with the caching arose when I add Google Analytics script. As it's an external script, CloudFlare couldn't cached it at all. I found a clever solution to this problem - downloading the analytics script and loading it from the project as a local file. Then I asked myself - what is Google updates the script, do I need to upload the script everyday? Actually, **no**. Google update their analytics script a couple of times a year, judging from their [Analytics Changelog  Page](https://developers.google.com/analytics/devguides/collection/analyticsjs/changelog). I set up a new recipe in IFTTT, so every time the script is updated I will receive a warning mail. I published the recipe, so you can use it too.

<a href="https://ifttt.com/view_embed_recipe/304686-analytics-js-update-send-mail" target = "_blank" class="embed_recipe embed_recipe-l_31" id= "embed_recipe-304686"><img src= 'https://ifttt.com/recipe_embed_img/304686' alt="IFTTT Recipe: analytics.js update - send mail connects feed to email" width="370px" style="max-width:100%"/></a><script async type="text/javascript" src= "//ifttt.com/assets/embed_recipe.js"></script>

## Eliminating render-blocking CSS and Javascript

Every CSS file slows down the rendering of the page. Fixing this problem is quite easy though - loading the css asynchronously:


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
	
This solution worked great, but another problem arose - I had an User Experience warning. The navigation links were too close to each other, so I had to include part of a CSS directly in the `<head>`. 


## Conclusion 

The road to 100 was a bumpy ride,but the satisfaction of fixing these problems and seeing the actual results was so enjoyable and probably the most fun part of the whole development process. I can now peacefully go to bed, knowing my website ok.