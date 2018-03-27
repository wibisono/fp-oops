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
  }

  //https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant
  val fractalPlant = Language("X", "+-[]", Map('X' -> "F+[[X]-X]-F[-FX]+X", 'F' -> "FF"), 25)


  case class Turtle(x: Double, y: Double, dir: Double, step: Double = 50) {
    val dx = cos(dir) * step
    val dy = sin(dir) * step

    def forward = Turtle(x + dx, y + dy, dir, step)

    def right(angle: Double) = Turtle(x, y, dir + angle / 180.0 * PI, step)

    def left(angle: Double) = Turtle(x, y, dir - angle / 180.0 * PI, step)
    
    def draw = Fiddle.draw.lineTo(x,y)
  }

  def interpret(expression: String, turn: Double): Seq[Turtle] = {
    var cTurtle = Turtle(300, 500, 0, 3).left(90)
    var tStack = List[Turtle]()
    expression map {
      case 'F' => cTurtle = cTurtle.forward; cTurtle
      case '-' => cTurtle = cTurtle.right(turn); cTurtle
      case '+' => cTurtle = cTurtle.left(turn); cTurtle
      case '[' => tStack  = cTurtle.copy() :: tStack; cTurtle
      case ']' => {
        cTurtle = tStack.head
        tStack  = tStack.tail
        cTurtle
      }
      case _ => cTurtle
    }
  }
  
  val plant6 = fractalPlant.next().next().next()
  .next().next().next()
  
  Fiddle.draw.strokeStyle="green"
  Fiddle.draw.beginPath
  interpret(plant6.state,25).foreach(_.draw)
  Fiddle.draw.stroke

```
{% endscalafiddle %}
