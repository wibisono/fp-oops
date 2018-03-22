<h2>Uptime Client</h2>

We have uptime clients, responsible to check uptime of a host.
A service will be implemented based on this client to get total uptime of all hosts.

The constraint in this exercise :
* We want to perform the checks in parallel, asynchronously 
* For testing we want to perform checks in synchronous fashion.
* We only want to implement the service once.

{% tnavs problemTabs %}
    {% tnav Problem %} Problem  {% endtnav %}
    {% tnav Learn %} Fiddle!{% endtnav %}
    {% tnav Solution  %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab Problem %} 
<br>

UptimeClient trait is provided, with a type constructor that allow us to decide later,
how we are performing the check (with Future or with synchronous Id). 

We will learn to use Applicative to parallelize the checking of total uptime.

There is a test at the end, with a mock uptime of hosts, that will see if you implement 
the synchronous version correctly.

{% endtab %}

{% tab Learn %} 
{% scalafiddle template="ShowResult" %}
```scala

        // F[_] is container of result that we will decide later.
        trait UptimeClient[F[_]] {
            def getUptime(host : String) : F[Int]
        }


        // Real client will be using future, not part of this exercise, 
        // but you can come up with something yourself
        import scala.concurrent.Future
        class RealUptimeClient extends UptimeClient[Future] {
            def getUptime(host : String) : Future[Int] = ???
        }

        // For testing we assume client is parameterised with map of host and uptimes 
        // Implement this function, getting 0 uptime if host is not in the key
        import cats.Id
        class TestUptimeClient( uptimes : Map[String, Int] ) extends UptimeClient[Id] {
            def getUptime(host : String) : Id[Int] = ??? 
        }

        import cats.Applicative             // so we can constraint that F[_] will be Applicative
        import cats.instances.list._        // we are going to treat our list of host names as Applicative, we need instances
        import cats.syntax.traverse._       // we will perform traverse of uptime clients 
        import cats.syntax.functor._        // once we get a list of uptimes, we want to get total and treat this as Functor

        // Observing those imports and signature of this function, try to implement it. 
        class UptimeService[F[_] : Applicative]( uptimeClient : UptimeClient[F]){
            def getTotalUptime(hosts : List[String]) : F[Int] = ???
        }

        // Feel free to add test for the RealUptimeClient depending on how you implement it
        // Here are the check for the synchronous version
        val hosts = Map("host1" -> 10, "host2" -> 6)
        val client = new TestUptimeClient(hosts)
        val service = new UptimeService(client)

        // Once you're done implementing this will produce expected result
        import scala.util._
        val actual = Try(service.getTotalUptime(hosts.keys.toList))
        val expected = Success(hosts.values.sum)

        actual == expected

```
{% endscalafiddle %}


{% endtab %}

{% tab Solution  %} 

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

        import cats.Applicative             // so we can constraint that F[_] will be Applicative
        import cats.instances.list._        // we are going to treat our list of host names as Applicative, we need instances
        import cats.syntax.traverse._       // we will perform traverse of uptime clients 
        import cats.syntax.functor._        // once we get a list of uptimes, we want to get total and treat this as Functor

        // Observing those imports and signature of this function, try to implement it. 
        class UptimeService[F[_] : Applicative]( uptimeClient : UptimeClient[F]){
            def getTotalUptime(hosts : List[String]) : F[Int] = hosts.traverse(uptimeClient.getUptime).map(_.sum)
        }

        // Feel free to add test for the RealUptimeClient depending on how you implement it
        // Here are the check for the synchronous version
        val hosts = Map("host1" -> 10, "host2" -> 6)
        val client = new TestUptimeClient(hosts)
        val service = new UptimeService(client)

        // Once you're done implementing this will produce expected result
        import scala.util._
        val actual = Try(service.getTotalUptime(hosts.keys.toList))
        val expected = Success(hosts.values.sum)

        actual == expected

```
{% endscalafiddle %}

{% endtab %}
{% endtabs %}

