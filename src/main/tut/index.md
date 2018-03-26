---
layout: home
---

Collections of notes, talks highlights, exercises and snippets of codes I found online while learning Functional Programming style in Scala.

There are some exercises that is presented using [ScalaFiddle](http://scalafiddle.io) so you can practice immediately without having to setup libraries needed. 

It will be formatted using the following template :
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

