/**
 * @file This file contains the implementation for greeting endpoint.
 */

import * as tyras from "@ty-ras/backend-node-zod-openapi";
import { greetingProcessing } from "@ty-ras-sample/service-sub-protocol";
import app, { type StateSpecBase } from "../app";

const urlPath = app.url`process`({
  // OpenAPI-specific information about all endpoints behind this URL pattern.
  openapi: {
    pathItem: {
      description:
        "Endpoint(s) related to processing greetings submitted to another service.",
    },
  },
});

const stateSpec = {
  // We don't really use authentication-related properties in the endpoint.
  // This is just to demonstrate how to specify that "this endpoint works for both authenticated and unauthenticated requests".
  // For truly unauthenticated endpoints, simply remove this property altogether so that stateSpec is just an empty object.
  userId: false,
} as const satisfies StateSpecBase;

/**
 * This class implements the greeting endpoint(s).
 */
export default class GreetingEndpoint {
  public constructor(
    private readonly _prefix: string,
    private readonly _suffix: string,
  ) {}

  /**
   * Implementation for {@link greeting.ProcessGreeting} endpoint.
   * @param param0 The endpoint input.
   * @returns The greeting.
   * @see greeting.ProcessGreeting
   */
  @urlPath<greetingProcessing.ProcessGreeting>({
    // OpenAPI -specific information about this endpoint
    openapi: {
      operation: { description: "Process the initial greeting value." },
      requestBody: {
        "application/json": {
          example: { greeting: "Hello, world!" },
        },
      },
      responseBody: {
        description: "The final processed greeting.",
        mediaTypes: {
          "application/json": {
            example: {
              newGreeting: "Hello, world!",
              prefix: "✨",
              suffix: "✨",
            },
          },
        },
      },
    },
  })({
    method: "POST",
    requestBody: app.requestBody(
      greetingProcessing.data.greetingProcessingInput,
    ),
    responseBody: tyras.responseBody(
      greetingProcessing.data.greetingProcessingOutput,
    ),
    state: stateSpec,
  })
  getGreeting({
    body: { greeting },
  }: tyras.GetMethodArgs<
    greetingProcessing.ProcessGreeting,
    typeof urlPath,
    typeof stateSpec
  >) {
    return {
      newGreeting: `Here is your greeting: ${greeting}`,
      prefix: this._prefix,
      suffix: this._suffix,
    };
  }
}
