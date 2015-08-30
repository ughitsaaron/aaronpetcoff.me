---
title: 'Using inline SVG icons for links with click event listeners'
tags:
  - javascript
  - html
  - css
---

I came across a quirky issue yesterday so I figured I would write a little bit about it.

I like to use inline SVG icons when I can. Not only are they more attractive, but they come with a whole bunch of development and performance benefits. Because the SVG is in the DOM you can manipulate it with CSS and Javascript, for example. Because the SVG is inline, you can also avoid the extra HTTP request for additional resources.

However, you might run into a problem when using inline SVG icons in an anchor tag or another element with a Javascript click handler.

Chris Coyier talks about this issue on [CSS Tricks](https://css-tricks.com/links-inline-svg-staying-target-events/). The problem is that if you have some markup like,

```html
<a class="pizza" data-toppings="['pineapple', 'feta']">
  <svg ...>
    <polygon ... />
  </svg>
</a>
```

And some Javascript like,

```javascript
var pizza = document.querySelector('.pizza');
pizza.addEventListener('click', function(e) {
  return e.target.getAttribute('data-toppings');
});
```

The problem here is that `e.target` could return as either `svg`, `polygon`, or `a.pizza` depending on where the user clicks.

To solve this, the developer could write some Javascript that mimicks the behavior of `$.closest`,

```javascript
function closest(element, selector) {
  for (; element && element !== document.body; element = element.parentNode) {
    if (element.tagName.toLowerCase() === selector) {
      return element;
    }
  }

  return;
}

pizza.addEventListener('click', function (e) {
  e.preventDefault();
  return closest(e.target, 'a').getAttribute('data-toppings'); // ['pineapple', 'feta']
});
```

This is a fine solution that totally works just fine. However, there's a CSS solution that might be a bit simpler.

`pointer-events` allows a developer to designate how an element responds to both click and touch events. The [W3 spec](http://www.w3.org/TR/pointerevents/#intro) characterizes a "pointer" as "any point of contact on the screen",

> Newer computing devices today, however, incorporate other forms of input, including touchscreens, pen input, etc. Event types have been proposed for handling each of these forms of input individually. However, that approach often incurs unnecessary duplication of logic and event handling overhead when adding support for a new input type.

Most of the `pointer-events` properties [are concerned with SVG](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events#Values).  For our purposes, the `none` and `auto` properties are the most intereting.

`pointer-events: none` means exactly what it sounds like: the element will respond to no pointer events. Since a "pointer" is broadly defined, you don't need to reproduce this code for different devices or screens. Any event such as click or touch will be disabled for the element styled.

You can imagine how this could be useful for a number of instances beyond simply fixing SVG icons attached to Javascript listeners or anchors like in our example above. It could be useful for disabling certain <button value="buttons" style="pointer-events: none;">buttons</button> or <a href="http://www.aaronpetcoff.me/" style="pointer-events:none;">links</a>, for example, in one central place with minimal code (literally *one line*!).

The children of elements styled `pointer-events: none` will inherit the property. `auto` on these children will reset the element to express the expected pointer behavior. Likewise, any HTML node styled `pointer-events: none` with a listener attached will obey the listener over the style.

Returning to our markup above, this means we can remove our `closest` function and simply add the following to our styles,

```css
/* make sure our anchor wraps around the SVG element */
a {
  display: inline-block;
}

svg {
  pointer-events: none;
}
```

This is totally semantic and legal markup using the `pointer-events` property as intended. What we get in return is replacing a few lines of Javascript in exchange for one CSS property at no performance cost.