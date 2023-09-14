# TyRAS Sample - Microservices: The Main Service

This folder contains the "main service" project part of [the whole microservice sample codebase](../..).
The idea of the main service is that it is a publicly exposed microservice which can be invoked by e.g. frontend or another microservice.
The code for the invocation of this service is outside of the scope for this sample, so this microservice can be thought as an entrypoint when doing e.g. `curl` requests.

This microservice uses [sub service](../service-sub) via [its protocol](../service-sub-protocol) and utilizing `@ty-ras/frontend-node-zod` library in [dedicated folder](./src/api/service-sub).
The endpoints for this microservice are defined utilizing `@ty-ras/backend-node-zod-openapi` library [also in dedicated folder](./src/api/endpoints).
The endpoints utilize the separate [main service protocol project](../service-main-protocol) so that it can be shared to FE or other microservice code.

Everything is bound together in the [api folder](./src/api) so that it can be simply referenced to in [entrypoint file](./src/index.ts).
The configuration for this service is exposed in [dedicated file](./src/config.ts).
When running `yarn run dev`, the source for the configuration is in [development configuration JSON file](./config-dev.json).
