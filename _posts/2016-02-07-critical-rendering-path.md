---
title: What is Critical Rendering Path
date: 2016-02-07 00:00:00 Z
layout: post
description: Ever wondered what happens when you type google.com and hit enter?
---

The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS and JavaScript into actual pixels on the screen. If we can optimize the critical rendering path, we can make our pages faster.

## Constructing the DOM

When you type an URL and hit enter, the browser sends a request to the server. The server returns a response with the HTML to the browser, which somehow needs to convert the markup into something that we can see on the screen. 

The browser follows a well defined set of steps and it all starts with processing the HTML and building the DOM.


1. **Conversion** - the browser reads the raw bytes of the HTML off the disk or network and translates them to individual based on specified encoding of the file.
2. **Tokenizing** - the browser converts strings of characters into distinct tokens - e.g `<html>`, `<body>` and other strings within the "angle brackets". Each token has a special meaning and a set of rules.
3. **Lexing** - the emitted tokens are converted into "node objects" which define their properties and rules. There is a relationship between the notes.
4. **DOM construction** - The tokenizer emits *start* and *end* tokens, which tells us the relationship between the notes. The created objects are linked in a tree data structure that also captures the parent-child relationships defined in the original markup: HTML object is the parent of the body object, the body object is the parent of the paragraph object and so on. The final output of the entire process is the DOM of the page, which the browser uses for further processing.

Every time the browser has to process HTML markup it has to step through all of the steps above: convert the bytes to characters, identify tokens, convert tokens to nodes, and build the DOM tree. This entire process can take some time if you have a large amount of HTML to process.

## CSS Object Model

When the browser is constructing the DOM and encounter a link tag in the document, which is, for example, referencing an external CSS stylesheet `styles.css`, it will immediately dispacth a request for this resource. The response will come back with the content of the CSS file.

Just as with HTML, we need to convert the received CSS rules into something that the browser can understand and work with. This process is similar to the DOM:

1. The CSS bytes are converted into characters. 
2. The characters will be converted to tokens. 
3. The emitted token are converted to nodes.
4. Finally, all nodes are linked into a tree like structure known as the "CSS Object Model", or CSSOM.

The browser will start with the most general rule applicable for that node. If the node is a child of body element, then all body styles apply and then apply the more specific rules - the rules "cascade down".

The browser blocks page rendering, until it receives and processes all of the CSS, meaning CSS is render blocking.

More specific rules require more work. Browsers match CSS selectors right-to-left.So they first find the children and then check their parents to see if they match the rest of the parts of the rule. The more specific rules are more expensive, because it has to traverse more nodes in the DOM tree. In most cases, selector matching is not the main reason for the performance bottleneck, but be sure to measure it first. More on that topic [here](http://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left).

Every browser provides a default set of styles also known as "user agent styles" - that is what we see when we don't provide any of our own styles. Our styles override these defaults.

## Render Blocking CSS

By default CSS is treated as render blocking resource, which means that the browser will hold rendering of any process until the CSSOM is constructed. 

CSS "media types" and "media queries" are non-blocking. When declaring the stylesheet assets, pay close attention to the media type and queries, as they will have big performance impact on the critical rendering path. Let's consider the following example:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

- The first declaration is render blocking and matches in all conditions.
- The second declaration is also render blocking - "all" is the default type and if not specified, it's implicitly set to "all".
- The third declaration has a dynamic media query which will be evaluated when the page is being loaded. Depending on the orientation of the device when the page is being loaded, `portarit.css` may or may not be loaded.
- The last declaration is only applied when the page is being printed, hence it is not render blocking when the page is first loaded in the browser.

Finally, note that "render blocking" only reference to whether the browser will have to hold the initial rendering of the page on that resource. The CSS assets will still be downloaded by the browser with a lower priority for non-blocking resources.

## The Render Tree

The CSSOM and DOM trees are combined into a render tree, which is then used to computate the layout of each visible element and serves as an input to the paint process which renders the pixels on the screen. **The render tree will only capture visible content**.

To construct a render tree, the browser does the following:

1. Starting at the root of the DOM tree, traverse each visible node.
    - not visible nodes (script tags, meta tags and so on) are omitted, since they are not reflected in the render output.
    - hidden nodes via CSS are also omitted from the render tree.
2. For each visible node finds the appropriate matching CSSOM rules and apply them.
3. Emit visible nodes with content and their computed styles.

The final output is a render that contains both the content and style information of all visible content on the screen. We can now proceed to the "layout" stage.

## Layout

Up to this point we've calculated which nodes should be visible and their computed styles, but we have not calculated their exact position and size within the viewport of the device - that's the _layout_ stage, also known as _reflow_.

The output of the layout process is a "box-model" which precisely captures the position and size of every element within the viewport.

By default the viewport of the page is 980px. This means that mobile browsers will render the page at a desktop screen width and then try to make the content look better by increasing font sizes and scaling the content to fit the screen. For users, this means that font sizes may appear inconsistent and they have to double-tap or pinch-to-zoom in order to see and interact with the content.

Using the meta viewport value `width=device-width` instructs the page to match the screen's width in device-independent pixels. This will reflow the content to match different screen sizes, whether rendered on a small mobile phone or a large desktop monitor.

{% highlight html %}
<meta name="viewport" content="width=device-width,initial-scale=1">
{% endhighlight %}

> Some browsers will keep the page's width constant when rotating to landscape mode and zoom rather than reflow to fill the screen. Adding the attribute `initial-scale=1` instructs browsers to establish a 1:1 relationship between CSS pixels and device-independent pixels regardless of device orientation.

## Paint

When we have the visible nodes (DOM), their computed styles (CSSOM) and geometry (Layout), we can pass this information to our final stage which will convert each node in the render tree to actual pixels on the screen. This step is known as "painting" or "rasterizing".

The painting time may vary based on render tree construction. The first thing to look for is the area of the element. The bigger the width and height of the element, the longer the painting. Adding different effects will also increase the painting time.

> As a rule of thumb, you should always measure first, then optimize.

## Conclusion 

So, here are the steps the browser goes through when loading a page:

1. Begin constructing the DOM by parsing the HTML - DOM construction may be incremental, so response may not arrive all at once, so we may not finish constructing it all at once.
2. Request CSS and JavaScript resources - the browser send request for all CSS or JavaScript files. If the script is synchronous it will not be executed until the CSS is received (CSS is render-blocking).
3. Execute JavaScript - completing the CSSOM will un-block the JavaScript engine and the scripts will be executed.
4. Merge the DOM and CSSOM into Render Tree - we have the DOM and CSSOM trees, so the browser will now build the Render Tree.
5. Run layout and paint - in this final step, the browser run the layout process and paint the page.

Optimizing the critical rendering path is the process of minimizing the total amount of time spend in steps 1 through 5 in the above sequence. Doing so will enable us to render content as soon as possible and also reduce the amount of time between screen updates after the initial render, achieving higher refresh rate for interactive content.