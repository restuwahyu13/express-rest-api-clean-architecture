# Express Rest Api Clean Architecture

The following is a folder pattern for express rest api starterkit structure pattern that I usually use, so if you are interested in the pattern I made, you can use it if you think it's good, check this link for new update for this architecture **[here](https://github.com/restuwahyu13/express-refactor-starterkit)**.

## Table Of Content

- [What Are The Benefits](#what-are-the-benefits-)
- [Folder Structure Pattern](#folder-structure-pattern)
- [Folder Status And Description](#folder-status-and-description)
   + [Test](#tests)
   + [Configs](#configs)
   + [Di](#di)
   + [Databases](#databases)
   + [Dto](#dto)
   + [Helpers](#helpers)
   + [Interfaces](#interface)
   + [Libs](#libs)
   + [Middlewares](#middlewares)
   + [Models](#models)
   + [Routes](#routes)
   + [Controllers](#controllers)
   + [Services](#services)
   + [Templates](#templates)
   + [Crons](#crons)
- [Command](#command)
   + [Application Lifecycle ](#application-lifecycle)
   + [Docker Lifecycle](#docker-lifecycle)
   + [Database Lifecycle](#database-lifecycle)

## What Are The Benefits ?

- [x] Easy to maintance
- [x] Easy to scalable
- [x] Readable code
- [x] Suitable for large projects or small projects
- [x] Easy to understand for junior or senior
- [x] And more

## Folder Structure Pattern

```
├── tests
│   └── test.user.spec.ts
├── di
│   └── di.user.ts
├── dto
│   └── dto.user.ts
└── helpers
│   └── helper.apiResponse.ts
└── middlewares
│   └── middleware.auth.ts
└── interfaces
│   └── interface.user.ts
└── models
│   └── model.user.ts
└── controllers
│   └── controllers.user.ts
└── services
│   └── service.user.ts
└── libs
│   └── lib.jwt.ts
└── configs
│   └── pm2.config.js
└── templates
│   └── activation.template.ejs
└── databases
│   └── migrations
│   │     └── user_20210913.go // generate auto by cli using third party library
│   └── seeds
│   │     └── user_20210913.go // generate auto by cli using third party library
```

## Folder Status And Description

- #### Tests
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                             |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Tests*         | *Optional*        | *A collection of functions used to create a series of tests or run a test, be it unit testing or integration testing, which will later be used for the application itself.* |

- #### Configs
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                         |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Configs*       | *Optional*        | *A collection of functions that contains all the configurations related to the application needs, such as .env or serverless.yml, which will later be used for the application itself.* |

- #### Di
| **Folder Name** | **Folder Status** | **Description**                                                                                  |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| *Di*           | *Required*        | *A collection of functions used to injected models database into services* |

- #### Dto
| **Folder Name** | **Folder Status** | **Description**                                                                      |
| --------------- | ----------------- | ------------------------------------------------------------------------------------ |
| *Dto*           | *Required*        | *A collection of functions used to handle all requests body passed from the client.* |

- #### Helpers
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                            |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Helpers*       | *Optional*        | *A collection of functions used to create utilities for application purposes, such as customError or customResponse, which will later be used for the application itself.* |

- #### Interfaces
| **Folder Name** | **Folder Status** | **Description**                                                          |
| --------------- | ----------------- | ------------------------------------------------------------------------ |
| *Interfaces*    | *Optional*        | *A collection of functions used to definition field property for model.* |


- #### Libs
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                   |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Libs*          | *Optional*        | *A collection of functions that are used for the purpose of customizing a library into a separate function, which will later be used for the application itself.* |


- #### Middlewares
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                                                                                           |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Middlewares*   | *Optional*        | *A collection of functions that are used as a service for HTTP Requests such as authJWt, authRole, customLogger whether used per-route or used globally without the need to use them in each route, which will later be used for the application itself.* |  |

- #### Models
| **Folder Name** | **Folder Status** | **Description**                                                                                                                       |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| *Models*        | *Required*        | *A collection of functions used to represent the table structure in a database, which will later be used for the application itself.* |

- #### Controllers  
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                                                                                         |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Controllers*   | *Required*        | *A collection of functions used to handle all requests given client, which then those requests will be used to delivery request to service, which will later be used for the application itself.* | 

- #### Routes
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                    |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Routes*        | *Required*        | *A collection of endpoints or addresses from the server itself, which is used for communication lines between the client and the server, which will later be used for the application itself.* | 

- #### Services
| **Folder Name** | **Folder Status** | **Description**                                                                                                               |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| *Services*      | *Required*        | *A collection of functions that are used to interact with the database, which will later be used for the application itself.* |

- #### Templates
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                                                                             |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Templates*     | *Optional*        | *A collection of functions that are used to output HTML code into emails to be used as templates, which will later be used for purposes such as activationCode or resetPassword, which will later be used for the application itself.* | 

- #### Crons
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                            |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Crons*         | *Optional*        | *A collection of functions that are used to trigger a desired function, according to the time specified by the user, which will later be used for the application itself.* |


- #### Databases
| **Folder Name** | **Folder Status** | **Description**                                                                                                                       |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| *Databases*     | *required*        | *A collection of functions used to create migrations or seeds for the database, which will later be used for the application itself.* |

## Command

- ### Application Lifecycle

  - Install node modules

  ```sh
  $ npm install
  ```

  - Build application

  ```sh
  $ npm run build || make build
  ```

  - Start application in development

  ```sh
  $ npm run dev | make dev
  ```

  - Start application in production

  ```sh
  $ npm run start || make start
  ```
  
  - Start application in production on docker

  ```sh
  $ npm run start:docker || make startdoc
  ```

  - Testing application

  ```sh
  $ npm run test || make test
  ```

  - Testing application include coverage

  ```sh
  $ npm run start:cov || make testcov
  ```

* ### Docker Lifecycle

  - Build container

  ```sh
  $ docker-compose build | make dcb
  ```

  - Run container with flags

  ```sh
  $ docker-compose up -d --<flags name> | make dcu f=<flags name>
  ```

  - Run container build with flags

  ```sh
  $ docker-compose up -d --build --<flags name> | make dcubf f=<flags name>
  ```

  - Run container

  ```sh
  $ docker-compose up -d --build | make dcu
  ```

  - Stop container

  ```sh
  $ docker-compose down | make dcd
  ```

* ### Database Lifecycle

  - Create new migration database

  ```sh
  $ npm run orm:make <migration name> || make ormake name=<migration name>
  ```

  - Run migration database to latest

  ```sh
  $ npm run orm:latest || make ormig type=latest
  ```

  - Run migration database to rollback

  ```sh
  $ npm run orm:rollback || make ormig type=rollback
  ```

  - Run show list all migration

  ```sh
  $ npm run orm:list || make list
  ```

  - Check valid TypeORM Config

  ```sh
  $ npm run seed:config || make orscon
  ```

  - Run seed database and migration

  ```sh
  $ npm run seed:run || make orsrun type=run
  ```

  - Run seed database and migration + Rollback

  ```sh
  $ npm run seed:runrollmig || make orsrun type=runrollmig
  ```

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2rem;">
  <b><a href="#express-rest-api-clean-architecture">BACK TO TOP</a></b>
</p>
