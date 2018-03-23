{% tnavs problemTabs %}
    {% tnav problem-id-1 %} Problem {% endtnav %}
    {% tnav foldmap-id %} Fiddle! {% endtnav %}
    {% tnav solution-id  %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab problem-id-1 %} 

<h3>Defining Fold Map</h3>

First problem we have to solve, is defining fold map:
* given a Vector of type A and and a function that transform A to B,
* we wanted to transform all As and fold them into one B in the end.

Easier example with concrete A and B:
* given a Vector of words (A is String), and a function to count length of String (B is Int for length) 
* we wanted to transform all words into length and calculate the total. 

Here is the signature of foldmap.
```scala 
def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = ???
```
What's with the `B : Monoid` syntax ? 
- It is a [context bound](https://docs.scala-lang.org/tutorials/FAQ/context-bounds.html), another way of saying  

```scala 
def foldMap[A, B](implicit mB : Monoid[B])(values: Vector[A])(func: A => B): B = ???
```

What it means to you as implementor of the function ?
- You can safely assume (or require that) in this context an implicit instance of Monoid[B] will be provided.

Why would you want to treat B as monoid ?
- Because as the story goes above, you are going to combine B's and start with empty B. Combine and empty is the defining characteristic of a Monoid

Say what ?
- You are going to count total word length, accumulating from zero, adding the word length as you go. 
- Adding is one of possible combine operator for Int monoid, and what you're doing fits with what Monoid provide. 


{% endtab %}

{% tab foldmap-id %} 

<h3>Fiddle Around!</h3>

{% scalafiddle template="ShowResult" %}

```scala 
import cats.Monoid

// Here is where you do the exercise
def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = {

  // Start with the assumption user of this function will give you instance of monoid for B
  val monoidB = implicitly[Monoid[B]]
  ??? 
}

// Tests
import scala.util._    
import cats.instances.int._
Try(foldMap(Vector("Count","Total","Length","Of","String"))(_.length)) == Success(24)
```
{% endscalafiddle %}

{% endtab %}

{% tab solution-id  %} 

{% scalafiddle template="ShowResult" %}

```scala 
import cats.Monoid

def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = {
    val monoidB = implicitly[Monoid[B]]
    values.foldLeft(monoidB.empty) {
      case (b, a) => monoidB.combine(b, func(a))
    }
}

import cats.instances.int._
foldMap(Vector("Count","Total","Length","Of","String"))(_.length) == 24

```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}
