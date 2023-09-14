/**
 * @file This file contains code exposing the TyRAS api call callback factory.
 */

import * as tyras from "@ty-ras/frontend-node-zod";
import config from "../../config";

const { host, port, scheme } = config.services.sub;

/**
 * This API call factory will be used by endpoints to create callbacks which invoke backend endpoints in typesafe manner.
 * The arguments to tyras.createAPICallFactory should be customized to use explicit connection pooling before using in production.
 */
export default tyras.createAPICallFactory({ host, port, scheme }).withHeaders({
  auth: () => {
    // This sample does not have any endpoints requiring authentication.
    throw new Error(
      "Please insert code to retrieve JWT token for any endpoints requiring authentication.",
    );
  },
});
