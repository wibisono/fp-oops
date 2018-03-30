---
layout: docs 
title: Expression Problem 
---

At the end of talks from Julien R Foy, about Existensial Types [Make OOP Great Again](https://www.youtube.com/watch?v=6j5kZj17aUw) he discussed about how abstract type members can be used to represent object algebra that nicely solved expression problem.

In the first tab, the common approach is to encode expression using sealed trait and case classes. With this problem, you can not easily add multiplication operation for example, because then you have to rewrite all the interpreters, or even impossible if the sealed trait is not yours. 

The second approach, using object algebras supposed to be more flexible, well watch the talk, I need to understand it better myself :)

{% tnavs problemTabs %}
    {% tnav reify-id active %} Sealed trait{% endtnav %}
    {% tnav expression-atm-id  %} ATM Object algebra {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab reify-id active %} 

{% scalafiddle %}

```scala 
sealed trait Expr
case class Lit(value : Int) extends Expr
case class Add(a : Expr, b: Expr) extends Expr

def interpret[A](lit: Int => A, add: (A, A) => A): Expr => A = {
  case Lit(value) => lit(value)
  case Add(a, b)  => add(interpret(lit,add)(a),interpret(lit,add)(b))
}
def eval = interpret[Int]((x:Int)=>x, (a:Int,b:Int) => a + b)
def show = interpret[String]((x:Int)=>s"$x", (a:String,b:String) => s"$a + $b")

val program = Add(Lit(2), Add(Lit(3), Lit(4)))

println(show(program) + " = " + eval(program))

```
{% endscalafiddle %}

{% endtab %}

{% tab expression-atm-id %} 

{% scalafiddle %}

```scala 
trait ExprDsl {
  type Expr
  def Lit(value: Int) : Expr
  def Add(a: Expr, b: Expr) : Expr
}
trait Eval extends ExprDsl {
  type Expr = Int
  def Lit(value: Int) = value
  def Add(a: Int, b: Int) = a + b
}
trait Show extends ExprDsl {
  type Expr = String
  def Lit(value: Int) = s"$value"
  def Add(a: Expr, b: Expr) = s"$a + $b"
}

trait Program extends ExprDsl {
    val expression = Add(Add(Lit(3), Lit(4)), Lit(5))
}

new Program with Show {
    println(s"$expression")
}

new Program with Eval {
    println(s"$expression")
}
```
{% endscalafiddle %}
{% endtab %}
{% endtabs %}
