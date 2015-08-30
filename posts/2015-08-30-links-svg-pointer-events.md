---
title: 'Using Inline SVG icons for links with click event listeners'
tags:
  - javascript
  - html
  - css
---

A quirky issue so I figured I would write a little bit about it.

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

`pointer-events` allows a developer to designate how an element responds to both click and touch events. The spec characterizes a "pointer" as "any point of contact on the screen",

> Newer computing devices today, however, incorporate other forms of input, including touchscreens, pen input, etc. Event types have been proposed for handling each of these forms of input individually. However, that approach often incurs unnecessary duplication of logic and event handling overhead when adding support for a new input type.

Most of the `pointer-events` properties [are concerned with SVG](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events#Values).  For our purposes here, however, the `none` and `auto` properties allow a developer to define whether or not a particular element responds to a pointer event.

The children of elements with the `pointer-events: none` property will inherit the property. `auto` on children will reset the expected behavior. Likewise, any node styled `pointer-events: none` with a listener will obey the listener over the style.

Returning to our markup above, all this means we can remove our `closest` function and simply add to our styles,

```css
/* make sure our anchor wraps around the SVG element */
a {
  display: inline-block;
}

svg {
  pointer-events: none;
}
```

This is totally semantic and legal markup, using the `pointer-events` property as intended, to define pointer events for an element and reduce the amount of unnessary code on writes, with no performance cost.