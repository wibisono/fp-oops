---
layout: docs 
title: Scala with Cats 
--- 

{% tnavs problemTabs %}
    {% tnav Problem %} Problem  {% endtnav %}
    {% tnav Learn %} Learn  {% endtnav %}
    {% tnav Solution  %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab Problem %} 
<h3>Uptime Client Case Study</h3>

This is a case study where we wanted to illustrate defining service and clients in a generic way.

We have client who is responsible to check uptime of a host machine.
A service will be implemented based on this client to get total uptime of all hosts.

We want to implement these service with possible two interpretation, during tests we wanted this service to behave synchronously.
When running on production we wanted them to run asynchronously, in parallel.

Learning the concept, it's better to read the book, but here, let's just exercise how to use Applicative to 
get the uptime in parallel. Hints are in the imports.

{% endtab %}

{% tab Learn %} 
<h3>Fiddle Around!</h3>
{% scalafiddle template="ShowResult" %}
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
            def getUptime(host : String) : Id[Int] = ??? 
        }

        import cats.Applicative             // for context bound
        import cats.instances.list._        // for hosts.traverse
        import cats.syntax.traverse._        // also for hosts.traverse 
        import cats.syntax.functor._        // to perform .map(_.sum)

        class UptimeService[F[_] : Applicative]( uptimeClient : UptimeClient[F]){
            def getTotalUptime(hosts : List[String]) : F[Int] = ???
        }

        val hosts = Map("host1" -> 10, "host2" -> 6)
        val client = new TestUptimeClient(hosts)
        val service = new UptimeService(client)
        val actual = service.getTotalUptime(hosts.keys.toList) 
        val expected = hosts.values.sum
        actual == expected

```
{% endscalafiddle %}


{% endtab %}

{% tab Solution  %} 
<h3>Solution</h3>

{% scalafiddle template="ShowResult" %}
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

        val hosts = Map("host1" -> 10, "host2" -> 6)
        val client = new TestUptimeClient(hosts)
        val service = new UptimeService(client)
        val actual = service.getTotalUptime(hosts.keys.toList) 
        val expected = hosts.values.sum

        actual == expected
```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}

