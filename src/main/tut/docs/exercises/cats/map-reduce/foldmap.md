{% tnavs problemTabs %}
    {% tnav problem-id-1 %} Problem {% endtnav %}
    {% tnav foldmap-id %} Fiddle! {% endtnav %}
    {% tnav solution-id  %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab problem-id-1 %} 

<h3>Defining Fold Map</h3>

First problem we have to solve, is defining fold map.

{% endtab %}

{% tab foldmap-id %} 
<h3>Fiddle Around!</h3>
{% scalafiddle template="ShowResult" %}
```scala 
import cats.Monoid
import cats.instances.vector._
import cats.instances.int._

def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = ???

import scala.util._    

Try(foldMap(Vector(1,2,3))( x=>x*10)) == Success(60)

```
{% endscalafiddle %}

{% endtab %}

{% tab solution-id  %} 

{% scalafiddle template="ShowResult" %}
```scala 

import cats.Monoid
import cats.instances.vector._
import cats.instances.int._

def foldMap[A, B: Monoid](values: Vector[A])(func: A => B): B = 
    values.foldLeft(implicitly[Monoid[B]].empty) {
      case (b, a) => implicitly[Monoid[B]].combine(b, func(a))
    }
    
foldMap(Vector(1,2,3))( x=>x*10) == 60
```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}
