# F1 Race Panel

## Project Layout
* `\packages\api` - Contains the soruce code for api.f1racepanel.com
* `\packages\client` - Contains the source code for f1racepanel.com
* `\packages\common` - Contains common source code (In particular, Prisma and Zod types)

## Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `bun install`              | Installs dependencies                            |
| `bun run dev`              | Starts local dev server at `localhost:3000`      |
| `bun run build`            | Build your production site to `./dist/`          |
| `bun run preview`          | Preview your build locally, before deploying     |
| `bun run astro ...`        | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help`  | Get help using the Astro CLI                     |
