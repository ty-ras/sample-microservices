/**
 * @file This file contains the validators which will be used to validate the HTTP-protocol related inputs and outputs when calling the endpoints.
 */

import * as data from "@ty-ras/data-zod"; // We don't import from main package in order for this code to be copypasteable into project shared by both BE and FE.
import * as t from "zod";

export const greetingProcessingInput = t.object({
  greeting: t.string(),
});
export const greetingProcessingOutput = t.object({
  newGreeting: t.string(),
  prefix: t.string(),
  suffix: t.string(),
});

/**
 * The input for the greeting processing endpoint.
 */
export type GreetingProcessingInput = data.ProtocolTypeOf<
  typeof greetingProcessingInput
>;

/**
 * The output for the greeting processing endpoint
 */
export type GreetingProcessingOutput = data.ProtocolTypeOf<
  typeof greetingProcessingOutput
>;
