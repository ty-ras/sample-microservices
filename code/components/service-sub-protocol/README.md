# TyRAS Sample - Microservices: The Sub Service Protocol

This folder contains the "sub service protocol" project part of [the whole microservice sample codebase](../..).
The idea of the sub service protocol project is that it only defines the data validators and types related to HTTP protocol behaviour of the service.
The project may then be utilized by code of actual services:
- the [sub service](../service-sub) to act as HTTP server providing REST API adhering to this protocol, and
- the [main service](../service-main) to act as HTTP client consuming the REST API of the sub service.
