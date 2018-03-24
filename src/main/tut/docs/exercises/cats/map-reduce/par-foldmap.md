---
layout: docs 
title: Parallel Fold Map 
--- 

{% tnavs problemTabs %}
    {% tnav p-parfoldmap-id active %} Problem  {% endtnav %}
    {% tnav f-parfoldmap-id %} Fiddle!  {% endtnav %}
    {% tnav s-parfoldmap-id %} Solution {% endtnav %}
    {% tnav s-catfoldmap-id %} Cats! {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab p-parfoldmap-id active %} 

<h3>Parallel Fold Map</h3>

We are going to parallelize result of our previous exercise, synchronous [Fold Map](foldmap) implementation. 
If you haven't done it, I suggested that you take a stab at that first exercise.

How ? Lets say you know number of processors you have, and you want to split the job into batches.

The required processing involve the following steps:
- We need to know number of available processor you have on your machine
- We need to distribute evenly our input data as batch to each processor we have
- We need to perform transformation on each batch using our existing [foldmap](foldmap) implementation
- We need to collect the result by performing a final reduce step from the result. 

Some helper pre processing steps :

{% scalafiddle template="ShowResult" %}

```scala 
// Getting number of processor available, unfortunately fiddling in JS we only have one of this
val nProcessors =  Runtime.getRuntime.availableProcessors

// Splitting existing vector to groups with size 3 
val batches = (1 to 10).toList.grouped(3)
 
s"""$nProcessors\nBatches:\n${batches.mkString("\n")}"""
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
        //Split the values in batches 

        //Pass the batches to previous foldmap 

        //Collect the result
        ???
      }


// Debug 
import scala.util._ 

val actual = parallelFoldMap(Vector("Count","Total","Length","Of","String"))(_.length)

assertEventually(24, actual)

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

        //Split the values in batches 
        values.grouped(batchSize).toList
        //Pass the batches to previous foldmap 
        .traverse(batch => Future(foldMap(batch)(func)))
        //Collect the result
        .map(reduce => foldMap(reduce.toVector)(identity))
      }

// Debug 

parallelFoldMap(Vector("Count","Total","Length","Of","String"))(_.length).map(println)

```
{% endscalafiddle %}

{% endtab %}


{% tab s-catfoldmap-id  %} 

<br>

This is the same solution, implemented with more power of the kittens.

Instead of reducing using previous foldmap and identity, we are using foldable and combineall.

{% scalafiddle template="ShowResult" %}

```scala 

import cats.Monoid
     
import cats.syntax.traverse._       
import cats.syntax.semigroup._
import cats.syntax.foldable._

import cats.instances.int._
import cats.instances.vector._        
import cats.instances.future._

import scala.concurrent.Future 
import scala.concurrent.ExecutionContext.Implicits.global

def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = {
    values.foldLeft(Monoid[B].empty)(_ |+| func(_))
}

def parallelFoldMap[A, B : Monoid]
      (values: Vector[A])
      (func: A => B): Future[B] = {
        val nProcessors =  Runtime.getRuntime.availableProcessors
        val batchSize   =  (values.size-1)/nProcessors + 1

        //Split the values in batches 
        values.grouped(batchSize).toVector
        //Pass the batches to previous foldmap 
        .traverse(batch => Future(foldMap(batch)(func)))
        //Collect the result
        .map(_.combineAll)
      }

// Debug 

parallelFoldMap(Vector("Count","Total","Length","Of","String"))(_.length).map(println)
```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}
