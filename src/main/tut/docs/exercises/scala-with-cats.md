---
layout: docs 
title: Scala with Cats 
---

<ul id="problemTabs" class="nav nav-tabs">
    <li class="active"><a class="nav-link" href="#problem" data-toggle="tab">Problem</a></li>
    <li><a href="#learn" data-toggle="tab">Learn</a></li>
    <li><a href="#solution" data-toggle="tab">Solution</a></li>
</ul>

<div class="tab-content">

    <div role="tabpanel" class="tab-pane active" id="problem"> 

        <h3>Uptime Client Case Study</h3>

        <p> 
            This is a case study where we wanted to illustrate defining service and clients in a generic way.

            We have client who is responsible to check uptime of a host machine.
            A service will be implemented based on this client to get total uptime of all hosts.

            We want to implement these service with possible two interpretation, during tests we wanted this service to behave synchronously.
            When running on production we wanted them to run asynchronously, in parallel.

            Learning the concept, it's better to read the book, but here, let's just exercise how to use Applicative to 
            get the uptime in parallel. Hints are in the imports.

        </p>

    </div>

    <div role="tabpanel" class="tab-pane" id="learn"> <h3>Fiddle around!</h3>

        {% scalafiddle %}

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
        assert(actual == expected)


        {% endscalafiddle %}

    </div>

    <div role="tabpanel" class="tab-pane" id="solution"> <h3>Solution</h3>
         {% scalafiddle %}

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
        assert(actual == expected)

        {% endscalafiddle %}

    </div>

</div>

