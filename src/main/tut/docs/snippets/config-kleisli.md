---
layout: docs 
title: Configuration using Kleisli
---

This is actually an example from [Odersky's talk](https://www.youtube.com/watch?v=YXDm3WHZT5g) not how to read config, before he explain the plain Functional programming approach using implicit functions.

The one discussed in the talk is the second tab, the kleisli version,
while this first tab is what I might have done myself.

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
def readPerson(config:Config) = for {
    name <- readName(config)
    age <- readAge(config)
} yield Person(name,age)

val config = Config("Simon Peyton Jones", 65)
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

val configK = Config("Martin Odersky", 65)
println(readPersonK(configK))
```
{% endscalafiddle %}
{% endtab %}
{% endtabs %}
