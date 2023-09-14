# TyRAS Sample - Microservices: Code for Services and Their Protocols

This folder contains all the code for the microservices part of this sample.
There are only two of them, for brevity and simplicity sake:
- [main service](./components/service-main) acting as an entrypoint (from e.g. frontend or other microservice), and
- [sub service](./components/service-sub) acting as an internal microservice.

In addition to the code of the services themselves, their HTTP protocol behaviour is exposed as separate projects:
- [main service protocol](./components/service-main-protocol) contains data validation structures and types related to endpoints exposed by the main service, and
- [sub service protocol](./components/service-sub-protocol) does the same for the sub service.

All the 4 projects are managed as NPM workspaces, and the master `package.json` file [resides in this directory](./package.json).

This is not meant to be a full-scope example project, so things like `nodemon` and such are omitted.
