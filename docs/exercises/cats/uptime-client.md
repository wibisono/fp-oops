<h2>Uptime Client</h2>
We have client who is responsible to check uptime of a host machine.
A service will be implemented based on this client to get total uptime of all hosts.

{% tnavs problemTabs %}
    {% tnav Problem %} Problem  {% endtnav %}
    {% tnav Learn %} Fiddle!{% endtnav %}
    {% tnav Solution  %} Solution  {% endtnav %}
{% endtnavs %}

{% tabs %} 

{% tab Problem %} 
<br>
Learn to use Applicative to parallelize the checking of total uptime, also such that  
we can write service and client without commiting to how actually we are going to execute them in the end. 
We might want to asynchronously run it  on the real environment, or synchronously during testing.

{% endtab %}

{% tab Learn %} 
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

