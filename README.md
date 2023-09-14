# TyRAS Sample - Microservices
This repository contains sample code for implementing microservices with [TyRAS framework](https://github.com/ty-ras).

The [code](./code) folder contains all the TypeScript code used in the sample, demonstrating how to use `@ty-ras/backend-node-zod-openapi` and `@ty-ras/frontend-node-zod` libraries as type-safe (via `zod` library) HTTP server and client, respectively.
The important folders are [main service](./code/components/service-main) and [sub service](./code/components/service-sub), each containing code for two microservices running as HTTP servers.
The shared libraries containing the HTTP protocol spec for each service are located in [main service protocol](./code/components/service-main-protocol) and [sub service protocol](./code/components/service-sub-protocol) folders.

The [dev](./dev) folder contains all the necesseties on running all the services locally as Docker containers.
By executing [local environment start script](./dev/run-dev-environment.sh) located in that folder (should work out of the box on OSX and Linux, and then on WSL on Windows), two containers will be started and controlled via [docker-compose.yml](./dev/docker-compose.yml) file.
These containers will run [main service](./code/components/service-main) and [sub service](./code/components/service-sub), with main service being exposed to host.
Once containers have booted up (should take just few seconds after initial Yarn install), running `curl -v http://127.0.0.1:3000/api/greet/world` on host will invoke the main service, which will then in turn invoke sub service, and finally return output.
