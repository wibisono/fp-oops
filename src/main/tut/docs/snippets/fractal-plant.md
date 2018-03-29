---
layout: docs 
title: Fractal Plants
---

Fractal plants, based on [Lindenmeyer](https://en.wikipedia.org/wiki/L-system) system 

{% scalafiddle minheight="600px" %}
```scala 
import Math._
import scala.annotation.tailrec

case class Language(constants: String,
                    rules: Map[Char, String]) {
  def next(state: String) =  state.map {
      case c if constants.contains(c) => c.toString
      case v => rules(v)
  }.mkString

  @tailrec
  final def next(state: String, step: Int): String = if (step <= 0) {
    next(state)
  } else {
    next(next(state), step - 1)
  }
}

case class Turtle(x: Double, y: Double, dir: Double, stepSize: Double = 50, turnAngle: Double = 25) {
  def step(s : Double = stepSize) : Turtle = {
    val dx = cos(dir) * s
    val dy = sin(dir) * s
    Turtle(x + dx, y + dy, dir, stepSize)
  }
  def right(angle: Double = turnAngle) = Turtle(x, y, dir + angle / 180.0 * PI, stepSize)
  def left (angle: Double = turnAngle) = Turtle(x, y, dir - angle / 180.0 * PI, stepSize)
}

def interpret(start: Turtle, state: String): Seq[Turtle] = {
  var cTurtle = start
  var tStack = List[Turtle]()
  state map {
    case 'F' => cTurtle = cTurtle.step(); cTurtle
    case '-' => cTurtle = cTurtle.right(); cTurtle
    case '+' => cTurtle = cTurtle.left(); cTurtle
    case '[' => tStack  = cTurtle.copy() :: tStack; cTurtle
    case ']' => {
      cTurtle = tStack.head
      tStack  = tStack.tail
      cTurtle
    }
    case _ => cTurtle
  }
}
//https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant
val fractalPlant = Language(constants = "+-[]", 
                            rules     = Map('X' -> "F+[[X]-X]-F[-FX]+X", 
                                            'F' -> "FF" ))

val plant6 = fractalPlant.next("X", 6)
val turtle = Turtle(250, 350, 0, 1, 25).left(90)

val turtles = interpret(turtle, plant6)

val draw = Fiddle.draw
draw.beginPath
turtles foreach { turtle =>
   draw.lineTo(turtle.x,turtle.y)
}
draw.stroke

```
{% endscalafiddle %}
