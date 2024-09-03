# F1 Race Panel
- [Website](https://f1racepanel.com)
- [Source Code](https://github.com/danielluna90/f1racepanel)


## Repository Structure
```text
.
├── docs - Has documentation about the project
└── packages
    ├── client-new - Contains the source code for f1racepanel.com
    └── server - Contains the source code for api.f1racepanel.com
```

## Quick Start
To get a local instance of F1 Race Panel running, execute the following in a command line terminal. This repository is tested using [Bun](https://bun.sh), although, in theory [npm](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/) would work with slight modifications of bun specific code.

First, add required Environment Variables. Schemas can be found in `packages/client/.env.development` and `packages/server/.env.schema`. At this time only the `.env` file in `packages/common` is required. This requirement might change in the future when Docker Compose is used for the PostgreSQL DB.

Installation with [Bun](https://bun.sh):

```bash
bun install
bun run dev
```

### Docker Containers
The development database runs within a Docker container. This is in order to make the database configuration reproducible for development but also for testing. For credentials to this dev environment consult [packages/common/README.md](./packages/common/README.md).

### Ports
- Server: `3000`
- Docker Environment
    - DB: `5432`
    - pgAdmin: `5050`
- Client: `4321`

## Documentation
For more information about more commands, design considerations, the tech stack used, etc. consult the documentation located in the `docs` folder. For a table of contents, consult [docs/README.md](./docs/README.md).
