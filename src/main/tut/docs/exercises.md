---
layout: docs
title: Exercises 
position: 2
---

<h2> Exercises </h2>

Collections of exercises that hopefully provide insight on certain topics.

It will be formatted using the following template :
- A problem description, including source of exercise, where I found it on the net or in a book.
- A learning ground to fiddle around with solution, there will be assertions to check correctness.
- A solution, either from the book, or whatever I could come up with so far.

Example of exercise is as follows: 

<ul id="problemTabs" class="nav nav-tabs">
    <li class="active"><a class="nav-link" href="#problem" data-toggle="tab">Problem</a></li>
    <li><a href="#learn" data-toggle="tab">Learn</a></li>
    <li><a href="#solution" data-toggle="tab">Solution</a></li>
</ul>

<div class="tab-content">

    <div role="tabpanel" class="tab-pane active" id="problem"> 

        <h3>The Two Numbers</h3>
        <p> This is an advanced exercise to add two integers </p>

    </div>

    <div role="tabpanel" class="tab-pane" id="learn"> <h3>Fiddle around!</h3>

        {% scalafiddle %}
        def sum(a: Int, b: Int) = ??? 

        assert(sum(2,2) == 4)
        {% endscalafiddle %}

    </div>

    <div role="tabpanel" class="tab-pane" id="solution"> <h3>Solution</h3>
        
        {% scalafiddle %}
        def sum(a: Int, b: Int) = a + b 

        assert(sum(2,2) == 4)
        {% endscalafiddle %}

    </div>

</div>

