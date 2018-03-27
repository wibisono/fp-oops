---
layout: docs 
title: Fractal Plants
---

Fractal plants, based on [Lindenmeyer](https://en.wikipedia.org/wiki/L-system) system 

{% scalafiddle minheight="600px" %}
```scala 
import Math._

case class Language(state: String,
                    constants: String,
                    rules: Map[Char, String],
                    turn: Double) {
                      
  def next() = Language(state.map {
                                    case c if constants.contains(c) => c.toString
                                    case v => rules(v)
                                  }.mkString, constants, rules, turn)

  def next(step : Int) :Language= if(step <=0) next() else next().next(step-1)
}

case class Turtle(x: Double, y: Double, dir: Double, step: Double = 50) {
  val dx = cos(dir) * step
  val dy = sin(dir) * step

  def forward = Turtle(x + dx, y + dy, dir, step)
  def right(angle: Double) = Turtle(x, y, dir + angle / 180.0 * PI, step)
  def left(angle: Double)  = Turtle(x, y, dir - angle / 180.0 * PI, step)
  def draw = Fiddle.draw.lineTo(x,y)
}

def interpret(start : Turtle, l : Language)= {
  Fiddle.draw.strokeStyle="green"
  Fiddle.draw.beginPath
  var cTurtle = start
  var tStack = List[Turtle]()
  val turtles = l.state map {
    case 'F' => cTurtle = cTurtle.forward; cTurtle
    case '-' => cTurtle = cTurtle.right(l.turn); cTurtle
    case '+' => cTurtle = cTurtle.left(l.turn); cTurtle
    case '[' => tStack  = cTurtle.copy() :: tStack; cTurtle
    case ']' => {
      cTurtle = tStack.head
      tStack = tStack.tail
      cTurtle
    }
    case _ => cTurtle
  }
  turtles.foreach(_.draw)
  Fiddle.draw.stroke
}

val start = Turtle(250, 350, 0, 1).left(90)

//https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant
val fractalPlant = Language("X", "+-[]", Map('X' -> "F+[[X]-X]-F[-FX]+X", 'F' -> "FF"), 25)
val language     = fractalPlant.next(6)

interpret(start, language)

```
{% endscalafiddle %}
