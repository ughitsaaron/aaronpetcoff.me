---
title: Porting my blog to Ember
tags:
  - javascript
  - ember
---

After giving it some thought I decided to port my blog over to using a client-side templating (Ember) rather than doing pure server-side rendering. Doing this not only makes transitioning between pages almost instantaneous -- it also resulted in reducing my whole code base by an enormous amount. It's an overall huge improvement.

I thought about doing this almost as soon as I had taken the original iteration of my blog off of using Angular to doing pure server-side rendering. What finally convinced me to do the switch was listening to this interview with Tom Dale and seeing him speak at a recent Manhattan.js. It really convinced me that all the concerns regarding client-side frameworks (e.g., initial load times, SEO, etc.) are either misinformed (for instance, Google now executes Javascript as it crawls pages) or misguided (yes, the initial load time might be slower, but the experience afterwards is vastly improved overall).
