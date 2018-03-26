---
layout: docs 
title: Sierpinsky Triangles 
---

Self similar sierpinski triangle using [Scalafiddle](http://scalafiddle.io)

{% scalafiddle %}
```scala 
import Math._

def triangle(x : Double, y: Double, h : Double, color:String="blue") = {
    val draw = Fiddle.draw
    val w = h/tan(PI/3)
    draw.fillStyle=color
    draw.beginPath
    draw.moveTo(x,y)
    draw.lineTo(x+w, y+h)
    draw.lineTo(x-w, y+h)
    draw.closePath
    draw.fill
}

def serpiensky(x : Double, y : Double, h : Double, level : Int, color:String="blue"): Unit = {
  if(level == 0){
    triangle(x,y,h,color)
  } else {
    val w = h/tan(PI/3)
    serpiensky(x-w/2, y+h/2, h/2, level-1)
    serpiensky(x+w/2, y+h/2, h/2, level-1)
    serpiensky(x, y, h/2, level-1)
  }
}

serpiensky(100, 0, 100, 0)
serpiensky(250, 0, 100, 1)
serpiensky(400, 0, 100, 2)
serpiensky(550, 0, 100, 3)

serpiensky(100, 150, 100, 4)
serpiensky(250, 150, 100, 5)
serpiensky(400, 150, 100, 6)
serpiensky(550, 150, 100, 7)

serpiensky(150, 300, 200, 10)

```
{% endscalafiddle %}
