/**
 * @file This file exposes the built TyRAS AppEndpoints, including OpenAPI endpoint, to be served via HTTP server.
 */

import * as tyras from "@ty-ras/backend-node-zod-openapi";
import app from "./app";
import config from "../config";
import GreetingProcessing from "./endpoints/greeting-processing";

/**
 * These endpoints compose the whole of REST API: the actual endpoints + endpoint to serve OpenAPI document about the actual endpoints.
 */
export default tyras.endpointsWithOpenAPI(
  app,
  app.createEndpoints(
    {
      // OpenAPI-specific information about the REST API.
      openapi: {
        title: "The example API",
        version: "1.0.0",
      },
    },
    {
      "/api/": {
        // The final URL of greeting endpoint will be "/api/greet/process".
        "greet/": new GreetingProcessing(
          config.greetingProcessing.prefix,
          config.greetingProcessing.suffix,
        ),
      },
    },
  ),
);
