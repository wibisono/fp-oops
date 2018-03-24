---
layout: docs 
title: Configuration using Kleisli
---

This is actually an example from [Odersky's talk](https://www.youtube.com/watch?v=YXDm3WHZT5g) not how to read config, before he explain the plain Functional programming approach using implicit functions.  The one discussed in the talk is the second tab, the kleisli version, while this first tab is what I might have done myself, using plain options and for comprehension. 

Just by writing these snippets my fear of Kleisli and WTF feeling whenever I see it reduced a lot. It is just an arrow of transformation, and you are just using it to compose functions, converting input to output within a certain context. In this case, the context is Option, and you are composing `readName` with `readAge` to get `readPerson`.

Without Kleisli on the left tab, you can only do it by passing config around. Kleisli allow you to do it without actually passing value parameter, but by composing the arrows.

{% tnavs problemTabs %}
    {% tnav plain-id active %} Plain Config {% endtnav %}
    {% tnav kleisli-id  %} Kleisli Config{% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab plain-id active %} 

{% scalafiddle %}

```scala 
case class Name(first:String, last:String)
case class Age(age:Int)
case class Person(name : Name, age : Age)
case class Config(name:String, age:Int)

def readName(config:Config): Option[Name] = {
    config.name.split(" ").toList match {
      case first :: last => Some(Name(first, last.mkString(" ")))
      case _ => None
    }
}
def readAge(config:Config): Option[Age] = {
    if(config.age >= 0 && config.age <=122) Some(Age(config.age))
    else None
}
// I left this lines blank, just so that you can switch tabs  and compare at the same level
// the following plain readPerson function with the Kleisli version on the other tab

// They look completely similar, just notice the difference
// Kleisli version is just composing arrows/functions, you are not passing any parameter
def readPerson(config:Config) : Option[Person] = for {
    name <- readName(config)
    age  <- readAge(config)
} yield Person(name,age)

val config = Config("Simon Peyton Jones", 60)
println(readPerson(config))
```
{% endscalafiddle %}

{% endtab %}

{% tab kleisli-id %} 

{% scalafiddle %}

```scala 
case class Name(first:String, last:String)
case class Age(age:Int)
case class Person(name : Name, age : Age)
case class Config(name:String, age:Int)

def readName(config:Config): Option[Name] = {
    config.name.split(" ").toList match {
      case first :: last => Some(Name(first, last.mkString(" ")))
      case _ => None
    }
}
def readAge(config:Config): Option[Age] = {
    if(config.age >= 0 && config.age <=122) Some(Age(config.age))
    else None
}
import cats.data.Kleisli
val readNameK = Kleisli(readName)
val readAgeK = Kleisli(readAge)

import cats.implicits._
val readPersonK = for {
    name <- readNameK  
    age  <- readAgeK
} yield Person(name,age)

val configK = Config("Martin Odersky", 59)
println(readPersonK(configK))
```
{% endscalafiddle %}
{% endtab %}
{% endtabs %}
