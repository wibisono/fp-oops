---
layout: docs 
title: Speaking Creature, Type Class 101 
---


Understanding type class, with illustration of simple type class  `Speaking` which accepts a creature.

{% scalafiddle template="ShowResult" %}

``` scala 

// Base type
sealed trait Animal
case class Dog(name:String) extends Animal
case class Cat(name:String) extends Animal

// Type class
trait Speaking [A] {
  def speak(creature : A) : String
}

// Type class instance
implicit val speakingDog = new Speaking[Dog] {
  def speak(dog : Dog) = s"I am speaking dog called ${dog.name}"
}

// Instance
val lassie = Dog("Lassie")

// Direct use of implicit instance using implicitly
implicitly[Speaking[Dog]].speak(lassie)

// Interface Object
object Speaking {
  def speak[A : Speaking](creature : A) = implicitly[Speaking[A]].speak(creature)
}

// Scala with Cats call this Interface Object, FP Simplified call this explicit way
Speaking.speak(lassie)

object SpeakingSyntax {
  implicit class SpeakingCreature[A](creature : A) {
    def speak(implicit  speakingA : Speaking[A]) : String = speakingA.speak(creature)
  }
}

// Interface syntax version
import SpeakingSyntax._

lassie.speak

```
{% endscalafiddle %}
