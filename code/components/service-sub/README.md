# TyRAS Sample - Microservices: The Sub Service

This folder contains the "sub service" project part of [the whole microservice sample codebase](../..).
The idea of the sub service is that it is an internal microservice invokable by other microservices in the same environment.
In this sample, the invocation is handled by [main service](../service-main).

The endpoints for this microservice are defined utilizing `@ty-ras/backend-node-zod-openapi` library [in dedicated folder](./src/api/endpoints).
The endpoints utilize the separate [sub service protocol project](../service-sub-protocol) so that it can be shared to with the main service which invokes this service.

The endpoints are bound together to a single REST API in the [api folder](./src/api) so that it can be simply referenced to in [entrypoint file](./src/index.ts).
The configuration for this service is exposed in [dedicated file](./src/config.ts).
When running `yarn run dev`, the source for the configuration is in [development configuration JSON file](./config-dev.json).
