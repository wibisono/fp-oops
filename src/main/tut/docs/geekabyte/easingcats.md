---
layout: docs
title: Easing into Cats 
---

Easing into cats from [Geekabyte](http://www.geekabyte.io/2018/09/easing-into-cats-and-case-for-category.html)
For full story you can check it out on the blog.

{% tnavs problemTabs %}
    {% tnav problem-id active %} Merging Maps {% endtnav %}
    {% tnav learn-id %} Learn  {% endtnav %}
    {% tnav sol-scl-id %} Scala Solution  {% endtnav %}
    {% tnav sol-cats-id %} Cats Solution  {% endtnav %}
{% endtnavs %}

{% tabs %}
{% tab problem-id active %} 

<h3>Merging two maps</h3>

Given two maps of type Map[Sting, List[String]], combine them to create a resulting map where identical keys from the three maps have their list values concatenated in the combined map.

So for example, combining 
```scala 
Map("k1" -> List("One"), "k2" -> List("Zero")) and Map("k1" -> List("Two")) should give Map("k1" -> List("One", "Two"), "k2" -> List("Zero")).
```

Use the following test data for implementation:
```scala
val movies1 = Map(
"Will Smith" -> List("Wild Wild West", "Bad Boys", "Hitch"),
"Jada Pinkett" -> List("Woo", "Ali", "Gotham")
)

val movies2 = Map (
"Will Smith" -> List("Made in America"),
"Angelina Jolie" -> List("Foxfire", "The Bone Collector", "Original
```

{% endtab %}

{% tab learn-id %} 

<h3>Fiddle Around!</h3>

{% scalafiddle %}
```scala 

val movies1 = Map(
  "Will Smith" -> List("Wild Wild West", "Bad Boys", "Hitch"),
  "Jada Pinkett" -> List("Woo", "Ali", "Gotham")
)

val movies2 = Map (
  "Will Smith" -> List("Made in America"),
  "Angelina Jolie" -> List("Foxfire", "The Bone Collector", "Original Sin")
)

// Have your solution here that would produce
// Map(Will Smith -> List(Wild Wild West, Bad Boys, Hitch, Made in America), Angelina Jolie -> List(Foxfire, The Bone Collector, Original Sin), Jada Pinkett -> List(Woo, Ali, Gotham))


```
{% endscalafiddle %}

{% endtab %}

{% tab sol-scl-id %} 
<h3> Scala Solution</h3>

{% scalafiddle %}
```scala 

val movies1 = Map(
  "Will Smith" -> List("Wild Wild West", "Bad Boys", "Hitch"),
  "Jada Pinkett" -> List("Woo", "Ali", "Gotham")
)

val movies2 = Map (
  "Will Smith" -> List("Made in America"),
  "Angelina Jolie" -> List("Foxfire", "The Bone Collector", "Original Sin")
)

val dZero = Map[String, List[String]]().withDefaultValue(List[String]())
val res = (movies1.toList ++ movies2.toList).foldLeft(dZero) {
  case (m, (k, v)) => m.updated(k, m(k) ++ v)
}

println(res)


```
{% endscalafiddle %}

{% endtab %}


{% tab sol-cats-id %} 
<h3> Cats Solution</h3>

{% scalafiddle %}
```scala 
import cats._
import cats.data._
import cats.implicits._
  
val movies1 = Map(
  "Will Smith" -> List("Wild Wild West", "Bad Boys", "Hitch"),
  "Jada Pinkett" -> List("Woo", "Ali", "Gotham")
)

val movies2 = Map (
  "Will Smith" -> List("Made in America"),
  "Angelina Jolie" -> List("Foxfire", "The Bone Collector", "Original Sin")
)

val merged = movies1 |+| movies2
```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}







