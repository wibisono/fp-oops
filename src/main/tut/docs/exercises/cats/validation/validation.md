---
layout: docs 
title: Data Validation 
--- 

<h2>Data Validation</h2>

This is the third case study from [Scala with Cats](https://underscore.io/books/scala-with-cats/ "Available for free to download!"). 

We want to do validation of data, and produce error messages if they don't met the valid requirements. Examples of validations are :
- Age must be > 18
- Address must not contain more than 2 lines.
- Some email string must contain @

In short, our data validation problem is formulated with the following requirement:
- Provide error messages while validating, accumulating them as we check the data.
- Allow combination and transformation of validation.

In [Scala with Cats](https://underscore.io/books/scala-with-cats/ "Available
for free to download!") there is a comprehensive discussion about the problem formulation, design decision making, and how to properly approach this
exercise. Please read the book for complete picture, and better thought process on this problem.

There are multiple stages of exercises in the book, we'll do simplified version here :
- [Basic Combinator](basic-combinator) where we started to define our checker
- [Transforming Data](transform-data) where we allow transformation of data to be validated.

