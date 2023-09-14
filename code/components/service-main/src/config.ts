import { configuration } from "@ty-ras-extras/backend-zod";
import * as t from "zod";

export type Config = t.TypeOf<typeof config>;
export type ConfigAuthentication = Config["authentication"];
export type ConfigHTTPServer = Config["http"];

const remoteEndpoint = t.object({
  host: t.string().nonempty(),
  port: t.number().int(),
});

const authConfig = t
  .object({
    // Insert authentication-related properties here
    // E.g. AWS pool ID + client ID + region, AzureAD tenant ID + app ID, etc.
  })
  .describe("AuthConfig");

// For now, this is all we need to call remote service
const serviceConfig = t.object({
  ...remoteEndpoint.shape,
  scheme: t.union([t.literal("http"), t.literal("https")]),
});

const config = t
  .object({
    authentication: authConfig,
    http: t
      .object({
        server: t
          .object({
            ...remoteEndpoint.shape,
            // TODO: certs
          })
          .describe("HTTPServerConfig"),
        // Remove this if CORS is not needed
        cors: t
          .object({
            frontendAddress: t.string().nonempty(),
          })
          .describe("HTTPCorsConfig"),
      })
      .describe("HTTPConfig"),
    services: t
      .object({
        sub: serviceConfig,
      })
      .describe("ServicesConfig"),
  })
  .describe("BEConfig");

const ENV_VAR_NAME = "TYRAS_SAMPLE_MAIN_SERVICE_CONFIG";
export default configuration.validateFromMaybeStringifiedJSONOrThrow(
  config,
  await configuration.getJSONStringValueFromMaybeStringWhichIsJSONOrFilenameFromEnvVar(
    ENV_VAR_NAME,
    process.env[ENV_VAR_NAME],
  ),
);
