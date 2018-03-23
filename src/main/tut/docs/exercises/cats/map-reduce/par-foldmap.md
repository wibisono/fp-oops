---
layout: docs 
title: Parallel Fold Map 
--- 

{% tnavs problemTabs %}
    {% tnav p-parfoldmap-id active %} Problem  {% endtnav %}
    {% tnav f-parfoldmap-id %} Fiddle!  {% endtnav %}
    {% tnav s-parfoldmap-id %} Solution {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab p-parfoldmap-id active %} 

<h3>Parallel Fold Map</h3>

We are going to parallelize previous [Fold Map](foldmap) implementation.
How ? Lets say you know number of processors you have, and you want to split the job into batches.

Some helpful functions 
{% scalafiddle template="ShowResult" %}

```scala 
// Getting number of processor available :
val nProcessors =  Runtime.getRuntime.availableProcessors

// Splitting existing vector to groups with size 3 

println((1 to 10).toList.grouped(3).toList)
 
nProcessors
```
{% endscalafiddle %}

{% endtab %}

{% tab f-parfoldmap-id %} 

<h3>Fiddle Around!</h3>

{% scalafiddle template="ShowResult" minheight="600px" %}

```scala 

import cats.Monoid
import cats.Applicative             
import cats.syntax.traverse._       

import cats.instances.list._        
import cats.instances.int._
import cats.instances.future._

import scala.concurrent.Future 
import scala.concurrent.ExecutionContext.Implicits.global

def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = {
    val monoidB = implicitly[Monoid[B]]
    values.foldLeft(monoidB.empty) {
      case (b, a) => monoidB.combine(b, func(a))
    }
}

def parallelFoldMap[A, B : Monoid]
      (values: Vector[A])
      (func: A => B): Future[B] = {
        val monoidB = implicitly[Monoid[B]]
        val nProcessors =  Runtime.getRuntime.availableProcessors
        val batchSize   =  (values.size-1)/nProcessors + 1
        // Process values per batch size, make use of grouped 
        // values ...
        ???
      }


// Debug 
import scala.util._ 

Try(parallelFoldMap(Vector("Count","Total","Length","Of","String"))(_.length).map(println))

```
{% endscalafiddle %}

{% endtab %}

{% tab s-parfoldmap-id  %} 

{% scalafiddle template="ShowResult" %}

```scala 

import cats.Monoid
import cats.Applicative             
import cats.syntax.traverse._       

import cats.instances.list._        
import cats.instances.int._
import cats.instances.future._

import scala.concurrent.Future 
import scala.concurrent.ExecutionContext.Implicits.global

def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = {
    val monoidB = implicitly[Monoid[B]]
    values.foldLeft(monoidB.empty) {
      case (b, a) => monoidB.combine(b, func(a))
    }
}

def parallelFoldMap[A, B : Monoid]
      (values: Vector[A])
      (func: A => B): Future[B] = {
        val monoidB = implicitly[Monoid[B]]
        val nProcessors =  Runtime.getRuntime.availableProcessors
        val batchSize   =  (values.size-1)/nProcessors + 1

        values.grouped(batchSize).toList
        .traverse(batch => Future(foldMap(batch)(func)))
        .map(reduce => foldMap(reduce.toVector)(identity))
      }

// Debug 

parallelFoldMap(Vector("Count","Total","Length","Of","String"))(_.length).map(println)

```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}
