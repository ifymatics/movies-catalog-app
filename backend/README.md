## Instructions for Nestjs Backend

1. Edit the name of .env.exaple file to .env
2. Add your local database info: host(DB_HOST), username(DB_USERNAME),
   password(DB_PASSWORD) and database name(DB).
3. Install dependencies (see "installation" section below).
4. To run the app locally (see "Running the app" section below).
5. To run unit and integration tests(see "Test" section below).
6. To test the backend APIs using postman(See "requests.http" file at the root of folder)
7. You can also make use of Postman alternative. Go ahead and install vscode
   "REST Client" extension (Optional)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
