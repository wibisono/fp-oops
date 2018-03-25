---
layout: docs 
title: Basic Combinator Validation 
--- 


{% tnavs problemTabs %}
    {% tnav p-basic-combinator-id active %} Problem {% endtnav %}
    {% tnav f-basic-combinator-id %} Fiddle! {% endtnav %}
    {% tnav s-basic-combinator-id  %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab p-basic-combinator-id active %} 

<h3>Basic Combinator </h3>

Let's start with a predefined Check trait that will perform a check on a certain type.
The result of the check would be either an error or a valid value.

Signature of the check is something like this :
```scala 
trait Check[E, A] {
  def apply(value: A): Either[E, A]
}
```

We want to define basic combinator, a way to compose checks. Let's start with defining `and` combinator.
I think there are more elaborate discussion on the original book, to come up with the proper signature for this combinator.

I am planning to summarise the point here, but for now, go figure and fiddle around :) 


{% endtab %}

{% tab f-basic-combinator-id %} 

<h3>Fiddle Around!</h3>

{% scalafiddle template="ShowResult" %}

```scala 
import cats.Semigroup
import cats.syntax.semigroup._

trait Check[E, A] {

  def apply(value: A): Either[E, A]

  def and(that: Check[E, A])(implicit s: Semigroup[E]): Check[E, A] = ??? 
}

type Error = String
implicit val commaSeparated = new Semigroup[Error] {
  def combine(a : Error, b: Error) = a +", "+b
}

type Checker[A] = Check[Error, A]

val mustBeGood = new Checker[String] {
  def apply(value: String) = ???
}

val mustBeLong = new Checker[String] {
  def apply(value: String) = ???
}

// Long enough and good
val mustBeGoodAndLong = mustBeGood and mustBeLong

println(mustBeGoodAndLong("Good enough"))

// Long enough but not good
println(mustBeGoodAndLong("Boobs"))

// Neither long nor good
println(mustBeGoodAndLong("Poop"))

```
{% endscalafiddle %}

{% endtab %}

{% tab s-basic-combinator-id  %} 

{% scalafiddle template="ShowResult" %}

```scala 
import cats.Semigroup
import cats.syntax.semigroup._

trait Check[E, A] {

  def apply(value: A): Either[E, A]

  def and(that: Check[E, A])(implicit s: Semigroup[E]): Check[E, A] = {
    (value: A) => {
      (this.apply(value), that.apply(value)) match {
        case (Right(a), Right(_)) => Right(a)
        case (Left(a), Right(_))  => Left(a)
        case (Right(_), Left(b))  => Left(b)
        case (Left(a), Left(b))   => Left(a |+| b)
      }
    }
  }
}

type Error = String
implicit val commaSeparated = new Semigroup[Error] {
  def combine(a : Error, b: Error) = a +", "+b
}

type Checker[A] = Check[Error, A]

val mustBeGood = new Checker[String] {
  def apply(value: String) = if(value.contains("Good")) {
    Right(value)
  } else {
    Left("String must contain Good")
  }
}

val mustBeLong = new Checker[String] {
  def apply(value: String) = if(value.length >= 5) {
    Right(value)
  } else {
    Left("String must be longer than 5")
  }
}

// Long enough and good
val mustBeGoodAndLong = mustBeGood and mustBeLong

println(mustBeGoodAndLong("Good enough"))

// Long enough but not good
println(mustBeGoodAndLong("Boobs"))

// Neither long nor good
println(mustBeGoodAndLong("Poop"))


```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}
