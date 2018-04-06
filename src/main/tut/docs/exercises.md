---
layout: docs
title: Exercises 
position: 1 
---

<h2> Exercises from Scala with Cats </h2>

Case studies from [Scala with Cats](https://underscore.io/books/scala-with-cats/ "Available for free to download!") book. 

1. [Uptime Client](kittens/uptime-client) where we exercise on applicative, and building service once, that can be instantiated differently in the end as asynchronous `Future` or synchronous test. 
2. [Map Reduce](kittens/map-reduce/map-reduce) where we will learn step by step to build map reduce in scala. This contains multiple exercises
3. [Data Validation](kittens/validation/validation) where we will build validation library based on cats.

<h2> Exercises from the Red Book </h2>

Interesting exercises from [The Red Book](https://www.manning.com/books/functional-programming-in-scala)

1. [Monoid](redbook/monoid) 


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


