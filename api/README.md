# API
A clean GraphQL API implementation
## Archtecture overview

![Imgur](https://i.imgur.com/32Hx0GE.png)

### Layers

The application is divided into 5 different and isolated layers that relay only in abstractions

#### Domain

Implements bussiness rules, only containing interfaces that set the expected behaviors:
  - Entities that the application use and manipulate
  - Usescases that interact with entities to set the expected bussiness rules

#### Data

Implement domain usecases, responsible for retrieve and manipulate data used throughout application, can interact with other usecases implementations.

#### Infra

Contain all details and external libraries code, implements protocols defined and used by data layer.

#### Presentation

Responsible for transform application data to external world, receives and execute usescases and handle exceptions, validations, athorizations...

#### Main

Is the composition layer, witch create instances from other layers and it's dependencies and initializes the application

## Project Setup

#### local

install dependencies

```bash
yarn install
```

Generate prisma schema, make sure to provide a `.env` file containing the `DATABASE_URL` enviroment varible

```bash
yarn prisma generate --schema=./src/main/prisma/schema.prisma
```

Run application

```bash
yarn up # for automatic reload with nodemon
```

or

```bash
yarn start
```

## Database Setup

Before start using the application, create projects migrations and populate it with transactions data.

### run migrations

##### Docker

```bash
make db-migrate
```

##### Local

```bash
yarn prisma migrate dev --schema=./src/main/prisma/schema.prisma
```
or run with `deploy` for production

```bash
yarn prisma migrate deploy --schema=./src/main/prisma/schema.prisma
```

### populate

After running migrations populate database

##### Docker

```bash
make db-populate
```

##### Local

```bash
# make sure to provide DATABASE_URL through .env file
node ./scripts/populate.js
```

## Testing
Run tests within the container with the following command

```bash
make test
```

To run tests locally make sure to provide `DATABASE_URL` enviroment varible

```bash
yarn test
```