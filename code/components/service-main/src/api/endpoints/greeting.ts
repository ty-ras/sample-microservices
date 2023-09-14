/**
 * @file This file contains the implementation for greeting endpoint.
 */

import * as tyras from "@ty-ras/backend-node-zod-openapi";
import { greeting } from "@ty-ras-sample/service-main-protocol";
import serviceSub from "../service-sub";
import app, { type StateSpecBase } from "../app";

const urlPath = app.url`${tyras.urlParameter(
  "target",
  greeting.data.greetingTarget,
)}`({
  // OpenAPI-specific information about all endpoints behind this URL pattern.
  openapi: {
    pathItem: {
      description: "Endpoint(s) related to greeting.",
    },
    url: {
      target: {
        description: "The target to greet.",
      },
    },
  },
});

const stateSpec = {
  // We don't really use authentication-related properties in the endpoint.
  // This is just to demonstrate how to specify that "this endpoint works for both authenticated and unauthenticated requests".
  // For truly unauthenticated endpoints, simply remove this property altogether so that stateSpec is simply an empty object.
  userId: false,
} as const satisfies StateSpecBase;

/**
 * This class implements the greeting endpoint(s).
 */
export default class GreetingEndpoint {
  /**
   * Implementation for {@link greeting.GetGreeting} endpoint.
   * @param param0 The endpoint input.
   * @param param0.url Privately deconstructed variable.
   * @param param0.url.target Privately deconstructed variable.
   * @returns The greeting.
   * @see greeting.GetGreeting
   */
  @urlPath<greeting.GetGreeting>({
    // OpenAPI -specific information about this endpoint
    openapi: {
      operation: { description: "Get the greeting for given target." },
      responseBody: {
        description: "The returned greeting.",
        mediaTypes: { "application/json": { example: "Hello, world!" } },
      },
    },
  })({
    method: "GET",
    responseBody: tyras.responseBody(greeting.data.greeting),
    state: stateSpec,
  })
  async getGreeting({
    url: { target },
  }: tyras.GetMethodArgs<
    greeting.GetGreeting,
    typeof urlPath,
    typeof stateSpec
  >) {
    const processedGreeting = await serviceSub.greeting.processGreeting({
      body: { greeting: `Hello, ${target}!` },
    });
    if (processedGreeting.error === "error-input") {
      throw new tyras.HTTPError(500);
    } else if (processedGreeting.error === "error") {
      throw new tyras.HTTPError(502);
    }
    const { prefix, suffix, newGreeting } = processedGreeting.data;
    return `${prefix}${newGreeting}${suffix}`;
  }
}
