/**
 * @file This file contains the code to call the greeting endpoint.
 */

import * as tyras from "@ty-ras/frontend-node-zod";
import { greetingProcessing } from "@ty-ras-sample/service-sub-protocol";
import factory from "../factory";

export default {
  processGreeting: factory.makeAPICall<greetingProcessing.ProcessGreeting>({
    method: tyras.METHOD_POST,
    url: "/api/greet/process",
    body: tyras.fromEncoder(greetingProcessing.data.greetingProcessingInput),
    response: tyras.fromDecoder(
      greetingProcessing.data.greetingProcessingOutput,
    ),
  }),
};
