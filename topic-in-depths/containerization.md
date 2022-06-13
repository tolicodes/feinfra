# Containerization

So start with what you know about VMs. The big advantage of VMs is that when something runs in your VM, it will most likely run in production the same way.

This is great for you tiny Wordpress site.

But now...you get to a slightly larger app infrastructure. You can either run your whole app as a monolith. But that only goes so far, and has all sorts of disadvantages. Development becomes much more difficult. Refactors are almost impossible. Instead you can break your app into a bunch of little apps.

But now you have 8 VMs running...That is a LOT of VMs. Especially if your individual apps are small, it makes no sense to spin up a whole new Linux instance.

So, now you have contrainers! Containers are essentially VMs. But they share a lot of the underlying system. So you can have 20 containers running on your mac, no problem. You can start and stop the containers you need at the moment in milliseconds.

But I didn't even get to the best part! When I worked at VM-based companies, it was a freaking pain in the ass to configure VMs. You had to do it manually. apt-get your packages, do all the config, yada yada. And.....you had to remember to do the exact same steps in prod, and staging, and dev. Which nobody ever did. So often times something would work on your VM, but not the prod VM.

Docker allows you to define all your packages and setup instructions declaratively. Which is kinda insane. You have a file which says exactly what you need to do from scratch to get your container running anywhere. No manual actions whatsoever. No room for error.

So now we get to EKS and ECS. This is called "container orchestration". Essentially what this means is, how do you get all your containers to work together. This includes scaling. So with VMs your only simple option is to increase the specs of your VM. But that only goes so far. And you might have a 128GB machine, meant for big spikes in traffic burning money, when usually you use 4GB. With orchestration you have an automatic mechanism to create as many replicas of your containers as you need as the load increases/decreases. Also orchestration involves inter-container networking, certs, etc.

So what's the difference between ECS and EKS? EKS uses Kubernetes, which is a massive open source orchestration platform. It does everything under the sun, including certs, all sorts of custom scaling, advanced networking, load balancing, etc. But it's a pain in the a\*\* to get it working properly. ECS is K8S lite basically. The upside is, a nice GUI where you define your container images, and it more or less works. The downside is, less options. But you can use AWS's native services for stuff like load balancing, etc. But then you're locked into AWS. Which I guess AWS would prefer ;)

These are just the basics. Ask your boss to send you to DockerCon and KubeCon. The community is very helpful and will tell you exactly what you need to know on virtually any related topic.

PS: how are you working @ Amazon and not using containers? Most of their AWS product is about container-adjacent infra :P



[K8S for Kids](https://www.youtube.com/watch?app=desktop\&v=4ht22ReBjno) - really funny take on K8s
