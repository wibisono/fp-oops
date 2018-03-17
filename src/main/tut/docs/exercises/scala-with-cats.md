---
layout: docs 
title: Scala with Cats 
section: exercises
---

# Case study uptime client


{% scalafiddle %}
```scala 

trait UptimeClient[F[_]] {
    def getUptime(host : String) : F[Int]
}

import scala.concurrent.Future
class RealUptimeClient extends UptimeClient[Future] {
    def getUptime(host : String) : Future[Int] = ???
}

import cats.Id
class TestUptimeClient( uptimes : Map[String, Int] ) extends UptimeClient[Id] {
    def getUptime(host : String) : Id[Int] = uptimes.get(host).getOrElse(0) 
}

import cats.Applicative             // for context bound
import cats.instances.list._        // for hosts.traverse
import cats.syntax.traverse._        // also for hosts.traverse 
import cats.syntax.functor._        // to perform .map(_.sum)

class UptimeService[F[_] : Applicative]( uptimeClient : UptimeClient[F]){
    def getTotalUptime(hosts : List[String]) : F[Int] = 
        hosts.traverse(uptimeClient.getUptime).map(_.sum)
}

def testTotalUptime() = {
  val hosts = Map("host1" -> 10, "host2" -> 6)
  val client = new TestUptimeClient(hosts)
  val service = new UptimeService(client)
  val actual = service.getTotalUptime(hosts.keys.toList) 
  val expected = hosts.values.sum
  assert(actual == expected)
}

```
{% endscalafiddle %}

