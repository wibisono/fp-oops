---
layout: home
---

Aiming to combine [object oriented and functional programming](https://www.youtube.com/watch?v=6j5kZj17aUw), Scala can be used (and abused) as another Java dialect without semicolon or as Haskell on JVM forgetting about its OOP feature. Finding a proper way of speaking the language, a balance between FP and OOP can be an interesting and long journey.

Depending on who you ask, you’ll probably get a different answer about the ‘proper way’.  
* Should it be [plain](https://www.youtube.com/watch?v=YXDm3WHZT5g) and [simple](https://www.youtube.com/watch?v=ecekSCX3B4Q) Scala advocated by the language author himself?  
* Should we have another [fresh and cute](https://confreaks.tv/videos/lambdaconf2015-cats-a-fresh-look-at-functional-programming-in-scala) look at FP?  
* Should we squeeze our program to achieve ultimate coherence without [declarative variable name](http://degoes.net/articles/insufficiently-polymorphic)?  
* What about using Scala while [making OOP great again](https://www.youtube.com/watch?v=6j5kZj17aUw)?  

In the end, there might be no proper way, there is only some way that fits your need at the moment.  

I prefer just to enjoy the journey. Admiring coherence promised by the purist, and utilizing pragmatic modularity of the language. 
Learning, fiddling around and making notes along the way.  In the course of this journey, I collected these exercises, talks highlights, and code snippets. Maybe they are useful for you also.

Exercises, snippets, and highlights are presented using [ScalaFiddle](http://scalafiddle.io) so you can fiddle around without having to setup libraries needed.  
If you have suggestions, corrections, ideas for exercises, feel free to create an [issue](https://github.com/wibisono/fp-oops/issues) or made a [pull request](https://github.com/wibisono/fp-oops/pulls).

<h2> Exercise Format </h2>
Exercises will be formatted using the following template :
- A problem description, including source of exercise, where I found it on the net or in a book.
- A learning ground to fiddle around with solution, there will be assertions to check correctness.
- A solution, either from the book, or whatever I could come up with so far.

Example of exercise is as follows: 

{% tnavs problemTabs %}
    {% tnav problem-id active %} Problem  {% endtnav %}
    {% tnav learn-id %} Learn  {% endtnav %}
    {% tnav solution-id %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %}
{% tab problem-id active %} 
<h3>The two Numbers</h3>
   This is an advance exercise to solve addition
{% endtab %}

{% tab learn-id %} 
<h3>Fiddle Around!</h3>

{% scalafiddle template="ShowResult" %}
```scala 

// Please solve this advanced exercise
def sum(a: Int, b: Int) = ??? 

import scala.util._ 

Try(sum(2, 4)) == Success(6)

```
{% endscalafiddle %}

{% endtab %}

{% tab solution-id %} 
<h3>Solution</h3>

{% scalafiddle template="ShowResult" %}
```scala 

def sum(a: Int, b: Int) = a+b 

sum(2, 4) == 6 
```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}


