# What is a Docker?

#### #Docker #Kubernetes #Microservices

![Docker](/posts/what_is_a_docker/docker.png)

Docker is a software platform that allows you to **build, test, and deploy** applications quickly.
* It provides the ability to package and run an application in a loosely **isolated environment** called a container, therefore, you can run many containers **simultaneously** on a given host.
* You can also share containers while you work so that everyone you share with gets the same container that works in the same way.
* You can deploy your application into your production environment and it works the **same** whether your production environment is a local data center, a cloud provider, or a hybrid of the two.

> ***Docker container is an instance of Docker image which is a self-contained runnable software application regardless the environment.***

> ***Docker is written in Go (Golang) and takes advantage of several feature of the Linux kernel to deliver its functionality.***
>
>> It uses a technology called `namespaces` to provide the isolated workspace called the container. When you run a container, Docker creates a set of **namespaces** for that contaier.

## Docker architecture

![Docker-architecture](/posts/what_is_a_docker/docker-architecture.webp)

Docker uses a client-server architecture, Docker-client talks to the Docker-daemon which does the heavy lifting of building, running, and distributing the Docker containers.

> ***Docker-client and daemon can run on the same system, or you can connect them remotely using a REST API, over UNIX sockets or a network interface.***

### Docker-client vs Docker-daemon

| Docker-client | Docker-daemon |
| ------------- | ------------- |
| The Docker-client (`docker`) is the primary way that many Docker users interact with Docker. | The Docker-daemon (`dockerd`) handles the Docker API requests and manages **Docker objects** such as **images, containers, networks, and volumes.** |
| The `docker` command uses the Docker API, the Docker-client can communicate with more than one daemon. | A daemon can also communicate with other daemons to manage Docker services. |
| When you use commands such as `docker run`, the client sends these commands to `dockerd` which carries them out. |

## Docker Registries

A Docker registry stores Docker images, a **Docker Hub** is a public registry opened for everyone.

* You can use `docker pull` or `docker run` commands to pull the requires images from your configured registry.
* Use the `docker push` command to push your image to your configured registry.

## Docker Objects

When you use Docker, you are creating and using images, containers, networks, volumnes, plugins, and other objects.

| Images | Containers |
| ------ | ---------- |
| An image is a **read-only** template with instructions for creating a Docker container. | A container is a **runnable instance** of an image. |
| An image is based on another image, with some **additional customization.** <br /><br /> Ex. You may build an image which is based on the `ubuntu` image, but installs the Apache web-server and your application, as well as the configuration details needed to make your application run. | You can create, start, stop, move, or delete a container using the Docker API or CLI. <br /><br /> You can connect a container to one or more networks, attach storage to it, or even create a new image based on its current state. |
| To build your own image, you creates a `Dockerfile` with a simple syntax for defining the steps needed to create the image and run it. <br /><br /> **Each instruction** in a Docker file creates **a layer** in the image, and when you change the Dockerfile and **rebuild** the image, **only** those layers which have changed are rebuilt. | A container is relatively **well-isolated** from other containers and its host machine. <br /><br />You can control how isolated a container's network, storage, or other underlying sub-systems are from other containers or from the host machine.
|| A container is **defined** by its image as well as any configuration options you provide to it when you create or start it, when it's removed, any changes to its state that aren't stored in persistent stroage **disappear**. |

## Example of `docker run` Command

```shell
docker run -i -t ubuntu /bin/bash/
```

This command runs an `ubuntu` container, attaches interactively to your local command-line session, and runs `/bin/bash`.

1. If you don't have the ubuntu image locally, Docker pulls it from your configured registry, as though you had run `docker pull ubuntu` manually.
2. Docker creates a new container, as though you had run a `docker container create` command manually.
3. Docker allocates a read-write file-system to the container, as its final layer. this allows a running container to create or modify files and directories in its local file-system.
4. Docker creates a network interface to connect the container to the default network, since you didn't specify any networking options. this includes assigning an IP address to the container. By default, containers can connect to external networks using the host machine's network connection.
5. Docker starts the container and executes `/bin/bash`. Because the container is running interactively and attached to your terminal (due to the `-t` and `-t` flags), you can provide input using your keyboard while Docker logs the output to your terminal.
6. When you run `exit` to terminate the `/bin/bash` command, the container stops but isn't removed. You can start it again or remove it.

> **`-it`: specifies that the command should be run in an interactive (`-i`) session with a pseudo-TTY (`-t` terminal) attached to the container.**
