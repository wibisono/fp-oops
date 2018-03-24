---
layout: docs 
title: Map Reduce 
--- 

<h2>Map Reduce</h2>

This is the second case study from [Scala with Cats](https://underscore.io/books/scala-with-cats/ "Available for free to download!"). 

Learning about Monoid, Functors, Fold and other goodies.  As you might have heard, map reduce is a technique to deal with data with two processing stages.

First, data is going through a mapping stage, which would transform each element of the big data.
Secondly result of this transformation is reduced to get the final result. 

In [Scala with Cats](https://underscore.io/books/scala-with-cats/ "Available
for free to download!") the first stage is discussed in Functor chapter 3,
mappable things.  The reduce stage is more familiarly known as fold also
discussed in Foldable and Traverse chapter 7. 

We will approach the problem also in stages:
* [Fold Map](foldmap), our first stab at the problem.
* [Parallel Fold Map](par-foldmap), make it faster!

