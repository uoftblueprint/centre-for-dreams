# Centre for Dreams

The Centre for Dreams is a day program that provides services for adults living with a developmental disability. UofT Blueprint is collaborating with the Centre for Dreams to build a centralized platform for announcements and program information.


## Project Structure
```
apps
  ├─ expo
  |   ├─ Expo SDK 49
  |   ├─ React Native using React 18
  |   └─ User facing mobile application
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      └─ Admin dashboard
packages
  ├─ api
  |   └─ tRPC router definitions
  └─ db
      └─ Prisma schema and migrations
```


This project uses a monorepo that contains our API, React Native mobile application, and Next.js admin dashboard.
## Local Setup

### Project dependencies

Before jumping into the project, install the following dependencies:

- Node.js 18 / [nvm](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/)
- [Watchman](https://github.com/facebook/watchman)
- [eas-cli](https://github.com/expo/eas-cli)

If you are on Mac, I recommend using [Homebrew](https://brew.sh/) and installing with

```zsh
brew install node nvm pnpm watchman
npm install -g eas-cli
```

This project uses Node 18, so use the command `nvm install 18` and `nvm use 18` to setup the correct version.

### Expo Go

For mobile development, this project uses [Expo](https://expo.dev/). You can use your phone for development by downloading the Expo Go app on [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US&pli=1). You will need to create an Expo account for developing the mobile application.

### Getting Started

Clone the project

```bash
git clone https://github.com/uoftblueprint/centre-for-dreams.git
```

Go to the project directory

```bash
cd centre-for-dreams
```

Install the workspace dependencies

```bash
pnpm install
```

### Environment Variables

To run the project, you will need to set some environment variables. Copy the example env

```bash
cp .env.example .env
```

After filling in the values in `.env`, you are ready to run the project!

### Database Setup

One of the environment variables that you need to fill out is `DATABASE_URL`. This project is using Postgres for the database. To setup a development database, you can either install Postgres locally or use an online provider.

For easy setup, we recommend using [Neon](https://neon.tech/) for your database. After creating an account and project, you will see a panel called "Connection Details" on the dashboard. Change the connection type from "psql" to "prisma", and then copy the values into your `.env`. Now you're ready for development!

### Applying Migrations to Database

Any time that you pull a new version of the project, you should apply new database migrations to ensure that your local schema matches the current Prisma schema.

```zsh
pnpm db:migrate

```

This command applies all new migrations to your database -- you are now ready to run the project!

### Creating Database Migrations

If you are making any changes to the Prisma schema, you will need to generate a new migration. You can do this with 

```zsh
pnpm db:migrate
```

The command will see the schema change and provide a prompt for the new migration name.

#### Quick Schema Iteration

While you are working on a ticket, you may want to try out multiple different schema options. You only want to make a migration when you have finalized a schema change, and each pr should contain at most one migration. To change your database schema during development, you can use 

```zsh
pnpm db:push
```

This will apply your current Prisma schema to your database.

### Running the Project

After finishing the setup, you can run the project with

```bash
pnpm dev
```

This command will run the admin dashboard and API on localhost:3000, open Prisma Studio on localhost:5556, and run the Expo application on localhost:8081.


#### Using Expo Go

To use Expo Go, you need to authenticate with Expo on your mobile device and computer. Use the login button on the mobile app to login with your account. On your computer, use

```zsh
eas login
```

Once you are authenticated on both devices, you will be able to see the mobile application under "Development servers" in Expo Go while `pnpm dev` is running.

## Project Commands

#### Run all applications

```zsh
pnpm dev
```

#### Run only the API and admin dashboard

```zsh
pnpm dev:web
```

#### Lint project

```zsh
pnpm lint
```

#### Auto-fix linting errors

```zsh
pnpm lint:fix
```

#### Format project

```zsh
pnpm format:fix
```

#### Generate Prisma Client
This command is run automatically whenever you use `pnpm dev`, `pnpm lint`, or `pnpm typecheck`.

```zsh
pnpm db:generate
```

#### Apply database schema to a local database

```zsh
pnpm db:push
```

#### Create a database migration

```zsh
pnpm db:migrate
```

#### Run type checks on all files
```zsh
pnpm typecheck
```

## Contributors

- [@BakerWJ](https://www.github.com/BakerWJ)
- [@ganeshasapu](https://github.com/ganeshasapu)
- [@jasonfyw](https://github.com/jasonfyw)
- [@1zhaohel](https://github.com/1zhaohel)
- [@RyanL123](https://github.com/RyanL123)
- [@helenaglow](https://github.com/helenaglow)
- [@LevOzay](https://www.github.com/LevOzay)
- [@nm-le](https://github.com/nm-le)
- [@sarinali](https://github.com/sarinali)
- [@Ram-Raghav-S](https://github.com/Ram-Raghav-S)

## License

[MIT](https://github.com/uoftblueprint/centre-for-dreams/blob/main/LICENSE)


