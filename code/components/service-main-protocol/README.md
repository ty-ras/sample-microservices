# TyRAS Sample - Microservices: The Main Service Protocol

This folder contains the "main service protocol" project part of [the whole microservice sample codebase](../..).
The idea of the main service protocol project is that it only defines the data validators and types related to HTTP protocol behaviour of the service.
The project may then be utilized by code of actual services:
- the [main service](../service-main) to act as HTTP server providing REST API adhering to this protocol, and
- frontend or another microservice to consume this REST API (out of scope for this sample).
