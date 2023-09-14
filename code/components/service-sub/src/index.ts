import * as tyras from "@ty-ras/backend-node-zod-openapi";
import config from "./config";
import endpoints from "./api";
import auth from "./auth";

/* eslint-disable no-console */

const {
  http: {
    server: { host, port },
  },
} = config;

await tyras.listenAsync(
  tyras.createServer({
    endpoints,
    createState: async ({ stateInfo: statePropertyNames }) => {
      const state: Partial<
        Record<(typeof statePropertyNames)[number], unknown>
      > = {};
      for (const propertyName of statePropertyNames) {
        if (propertyName in tyras.DEFAULT_AUTHENTICATED_STATE) {
          state[propertyName] = await auth();
        }
      }

      return state;
    },
    // React on various server events.
    events: (eventName, eventArgs) => {
      console.info("EVENT", eventName);
      logEventArgs(eventArgs);
    },
  }),
  host,
  port,
);

console.info(`Started server at ${host}:${port}.`);

function logEventArgs(
  eventArgs: tyras.VirtualRequestProcessingEvents<
    unknown,
    unknown
  >[keyof tyras.VirtualRequestProcessingEvents<unknown, unknown>],
) {
  const isError = "validationError" in eventArgs;
  console[isError ? "error" : "info"](
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tyras.omit(eventArgs, "ctx", "groups" as any, "regExp", "validationError"),
  );
  if (isError) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error(JSON.stringify(eventArgs.validationError));
  }
}
