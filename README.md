# LDAP server

This is a simple LDAP server written in typescript. The idea was to build an extremely simple server for home use to allow accessing different computers, NextCloud, etc. with same account. All solutions I've found was more of an enterprise class stuff that required a lot of work to setup and maintain. This solution is planned to include a simple REST-api for managing users and allowing them to change password etc.

## Repository structure

All I/O goes through `adapters` that needs to implement certain `port`. In addition, all adapters are initiated as singletons. This will allow us to implement different database drivers, loggers, etc. and choose them with env-flags.

Tests are written next to the actual source file, but when adding new test-file, it must also be included in the `src/index.test.ts` file for the tests to be run.

## Setup dev-environment

Clone the repository and run:

```
npm ci
npm run prepare
```

Copy `.env.example` to `.env` and add values suited for your needs.

You can run lint and tests with the following commands:

```
npm run lint
npm run test
```

You can run the actual app, but it does not have hot-reload at the moment:

```
npm run start
```
