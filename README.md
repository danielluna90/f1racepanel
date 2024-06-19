# F1 Race Panel
- [Website](https://f1racepanel.com)
- [Source Code](https://github.com/danielluna90/f1racepanel)


## Repository Structure
```text
.
├── docs - Has documentation about the project
└── packages
    ├── api - Contains the source code for api.f1racepanel.com
    ├── client - Contains the source code for f1racepanel.com
    ├── client-new - Contains the source code for f1racepanel.com
    └── common - Contains common source code (In particular, Prisma and Zod types)
```

## Quick Start
To get a local instance of F1 Race Panel running, execute the following in a command line terminal. This repository is tested using [Bun](https://bun.sh), although, in theory [npm](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/) should work with slight modifications.

First, add required Environment Variables. Schemas can be found in `packages/common/.env.schema` and `packages/api/.env.schema`. At this time only the `.env` file in `packages/common` is required. This requirement might change in the future when Docker Compose is used for the PostgreSQL DB.

Installation with [Bun](https://bun.sh):

```bash
bun install
bun run dev
```

## Documentation
For more information about more commands, design considerations, the tech stack used, etc. consult the documentation located in the `docs` folder. For a table of contents, consult [docs/README.md](./docs/README.md).
