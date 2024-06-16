# F1 Race Panel

## Project Layout
* `/packages/api` - Contains the soruce code for api.f1racepanel.com
* `/packages/client` - Contains the source code for f1racepanel.com
* `/packages/client-new` - Contains the client code for f1racepanel.com
* `/packages/common` - Contains common source code (In particular, Prisma and Zod types)

## Commands

All of these commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `bun install`              | Installs dependencies                            |
| `bun run dev:server`       | Starts local dev server at `localhost:3000`      |
| `bun run dev:client`       | Starts local client at `localhost:4321`          |
| `bun run dev:client-new`   | Starts local new client at `localhost:4321`      |
| `bun run dev`              | Starts server and new client                     |
| `bun run build`            | Builds the old client.                           |
