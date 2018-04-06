---
layout: docs
title: Monoid 
---

Monoid exercises 10.9 from [The Red Book](https://www.manning.com/books/functional-programming-in-scala)

{% tnavs problemTabs %}
    {% tnav problem-id active %} Ordered {% endtnav %}
    {% tnav learn-id %} Learn  {% endtnav %}
    {% tnav solution-id %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %}
{% tab problem-id active %} 
<h3>Checking order with Monoid</h3>

In this exercise you are given an `IndexedSeq[Int]` to be checked whether they are ordered using `FoldMap`.

Foldmap definition is given, you need to define :
* `intOrderMonoid` decide what should be the required monoid type parameter
* implement `ordered(iseq : IndexedSeq[Int]) : Boolean` function which will use given `foldMap` and monoid you just defined.

{% endtab %}

{% tab learn-id %} 
<h3>Fiddle Around!</h3>

{% scalafiddle %}
```scala 
import cats.Monoid
import scala.math.Ordered

def foldMap[A,B](as : IndexedSeq[A])(f : A=>B)(implicit m : Monoid[B]) = {
    as.foldLeft(m.empty) { (b : B, a : A) => m.combine(b, f(a)) }
}

type InOrder = ??? 
implicit val mon = new Monoid[InOrder] {
  def empty = ??? 
  def combine( a : InOrder, b : InOrder) = ???
}

def ordered(iseq : IndexedSeq[Int]) = ??? 

println(ordered(IndexedSeq(1,2,3,4)) == true)
println(ordered(IndexedSeq(1,3,2,4)) == false) 
```
{% endscalafiddle %}

{% endtab %}

{% tab solution-id %} 
<h3>Solution</h3>

[Original solution](https://github.com/fpinscala/fpinscala/blob/7a43335a04679e140c8c4cf7c359fd8a39bbe39f/answers/src/main/scala/fpinscala/monoids/Monoid.scala#L120) from the Red Book seems a bit more contrived, choosing `Option[Int,Int,Boolean]` as monoid type parameter.  
Here we just use pair of `(Int, Boolean)` :)

In this solution, you keep the latest value, but indicate it whether we are still in order with the boolean flag.  
When combining, we require all these flag are still in order, and the right part is bigger than the left. 

{% scalafiddle %}
```scala 
import cats.Monoid
import scala.math.Ordered

type InOrder = (Int, Boolean)
implicit val mon = new Monoid[InOrder] {
  def empty = (Int.MinValue, true)
  def combine( a : InOrder, b : InOrder) = {
      val (aVal, aInOrder) = a
      val (bVal, bInOrder) = b
      (bVal, (aInOrder && bInOrder && bVal > aVal))
  }
}
def foldMap[A,B](as : IndexedSeq[A])(f : A=>B)(implicit m : Monoid[B]) = {
    as.foldLeft(m.empty) { (b : B, a : A) => m.combine(b, f(a)) }
}
def ordered(iseq : IndexedSeq[Int]) = foldMap(iseq)(a => (a,true))._2

println(ordered(IndexedSeq(1,2,3,4)) == true)
println(ordered(IndexedSeq(1,3,2,4)) == false) 
```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}
