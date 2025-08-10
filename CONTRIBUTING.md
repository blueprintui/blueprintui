# Contributing

Before starting a contribution please submit a feature request/proposal to improve likelihood of changes being accepted/merged. While the BlueprintUI monorepo is stil new and in early stages you can start running the repo locally by following the steps below.

1. Clone the mono repo

   ```bash
   git clone https://github.com/blueprintui/blueprintui.git
   ```

2. Install [NodeJS](https://nodejs.org/en/) and run setup script

   ```bash
   nvm use (optional but recommended)

   npm run setup
   ```

3. Run full repo build command
   ```bash
   pnpm run ci
   ```

## Local Development

Open the repo in your editor of choice. To run a project in the project directory run `npm run start`

```bash
# /projects/components
pnpm run start
```

Run `npm run ci` in the root of the repo to check build and tests for all projects in the repository.

## Debugging

If the build or install fails you can do a full clean, install and rebuild of the mono repo by running the following

```bash
pnpm run reset && pnpm run ci
```
