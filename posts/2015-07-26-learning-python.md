---
title: 'Teaching Myself Python'
tags:
  - python
  - education
---
Javascript has been my primary programming language for about a year now. I'm very far from an expert. A few months ago, I decided that I feel confident enough writing in Javascript that I should take on learning a second language.

I love writing in Javascript. I'm eager, however, to avoid feeling constrained by through the limited constraints of only having one language on which to evaluate every problem you come across. Learning a second language gives me a wider knowledge of the conceptual tools that exists in language design.

Furthermore (but to a lesser extent) [Javascript seems especially notorious for its quirks](https://www.destroyallsoftware.com/talks/wat), e.g.,
```javascript
{} + []
//=> 0
[] + {}
//=> "[object Object]"
```
While the cases in which these quirks might come up seem limited, it seems beneficial to have some perspective on how such cases would be handled in another language, e.g., throwing a `TypeError` might have made sense.

Python seemed appealing to me as my next language for a couple of reasons. For one, it's familiar. Coming from Javascript, Python's loose typing, common use, and active community seem appealing. But Python is also different enough from Javascript to make it feel like learning it will advance my growth as a programmer.

I was also attracted to Python's (seemingly) wide use in Computer Science courses. While having no formal education in Computer Science hasn't been a tremendous barrier to me, I do often find myself eager to know what's going on behind a lot of the magic in programming, not to mention to have a stronger grasp on the rhetoric or the architectural or design decisions of particular libraries, frameworks, applications, etc. As I've been teaching myself Python, I've been following along with this Introduction to Computer Science course from [MIT OpenCourseWare](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-00sc-introduction-to-computer-science-and-programming-spring-2011/).

I've been having a lot of fun getting familiar with the differences between Python and Javascript. The main things that stick out to me so far (aside from inheritance differences which I already mentioned) are the differences in datatypes, type coersion, and the concept of mutability.

There a [couple of great posts](http://hg.toolness.com/python-for-js-programmers/raw-file/tip/PythonForJsProgrammers.html) [that hash out some of these differences](https://blog.glyphobet.net/essay/2557) better than I possibly could, so I won't elaborate too heavily on this subject. Briefly, I just want to say that it's been especially interesting to me to see the different behaviors between Javascript datatypes like arrays and objects and Python datatypes like lists, tuples, dictionaries, sets, etc. I suspect that before starting to work in Python, I had kind of subconciously assumed that objects and arrays cover anything you'd ever need in a collection (I mean, that's all you get with JSON, right?). Starting to understand these different use cases for lists, tuples, dictionaries, sets, etc., has been especially fascinating to me.

I'll be writing plenty more about this subject in the future as new questions or exciting things come up. I'll leave this here for now.
