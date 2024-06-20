# F1 Race Panel (API Server)

## Getting Started

In order to make sure your configuration is correct, you should run
`bun run dev` from the root of the monorepo. It should be noted that running
`bun run dev` from this directory should still work, however, at the moment it
is considered unsupported and therefore may cause undefined behavior. This might
change in the future.

## Important URLs

Port found in `.env.dev`: `3000` (This should be the default port whilst in
development unless altered in .env)

F1 Race Panel API Documentation: `http://localhost:3000/docs`

- Raw OpenAPI spec yaml file can be found in
  [src/static/api/api-spec.yml](./src/static/api/api-spec.yml)

F1 Race Panel API entry point: `http://localhost:3000/v1/`
