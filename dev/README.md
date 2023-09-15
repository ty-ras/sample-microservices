# TyRAS Sample - Microservices: Local Environment

This folder contains the necessary components to run [main service](../code/components/service-main) and [sub service](../code/components/service-sub) locally as Docker containers.
The [Docker Compose file](./docker-compose.yml) contains the definitions for the services, configuration (via secrets), and networks.
The [main service configuration file](./service-main.json) contains HTTP server configuration as well as sub service endpoint information.
The [sub service configuration file](./service-sub.json) contains HTTP server configuration and parameteres for greeting processing.

The [environment execution file](./run-dev-environment.sh) encapsulates all actions needed to start the local environment from scratch (assuming POSIX shell and Docker are installed).
This file should be used to start the environment.

Once environment is running, it is possible to invoke main service from the host by running e.g. `curl -v http://127.0.0.1:3000/api/greet/world`.
