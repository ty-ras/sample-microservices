/**
 * @file This file contains TyRAS protocol type definitions for endpoint doing a greeting.
 */

import type * as data from "./data";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as protocol from "@ty-ras/protocol"; // Imported only for JSDoc.

/**
 * This is TyRAS protocol type definition for endpoint transforms a greeting.
 */
export interface ProcessGreeting {
  /**
   * The HTTP method for this endpoint: `POST`.
   * @see protocol.ProtocolSpecCore.method
   */
  method: "POST";

  /**
   * The request body type for this endpoint
   * Only one:
   * - `target`: The target of the greeting.
   * @see protocol.ProtocolSpecRequestBody.requestBody
   * @see data.GreetingInput
   */
  requestBody: data.GreetingProcessingInput;

  /**
   * The response body for this endpoint.
   * @see protocol.ProtocolSpecCore.responseBody
   */
  responseBody: data.GreetingProcessingOutput;
}
