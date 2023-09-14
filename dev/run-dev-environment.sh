#!/bin/sh

export TYRAS_SAMPLE_GIT_ROOT="$(git rev-parse --show-toplevel)"

# Install dependencies if needed
docker run \
  --rm \
  -v "${TYRAS_SAMPLE_GIT_ROOT}/code/:${TYRAS_SAMPLE_GIT_ROOT}/code/:rw" \
  -w "${TYRAS_SAMPLE_GIT_ROOT}/code" \
  --entrypoint yarn \
  node:18-alpine \
  install \
  --frozen-lockfile

# Run the services
docker compose \
  --file "${TYRAS_SAMPLE_GIT_ROOT}/dev/docker-compose.yml" \
  --project-name "tyras-sample-microservices" \
  up