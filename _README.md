# Project Name

Slack Overflow - 

Community learning app that lets you contact knowledgeable users for help on specific topics
and share your own knowledge with others.

## Team

  - __Product Owner__: Joshua Bahr
  - __Scrum Master__: Inseok Seo
  - __Development Team Members__: Jason Shao

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

HOW TO GET STARTED:

Create a config.js file in your root directory. Include in your config.js file the following variables:
var secret
var audience
var dbUrl

secret and audience are values specific to your auth0 account. dbUrl should store your elephantSQL database URL. Use module.export and require to share these variables with their associated files. 

Also in auth.config.js, create a config module to initialize auth0.

The server is set up in server.js. The database connection occurs within db/index.js. Pass your database url from your config file to this function.

The auth0 variables are passed to routes.js.

The init.js file includes two separate init functions. The first one will drop all defined tables, create new tables, and seed the new tables with dummy data found within the tableModels.js file. The second init function will sync the server with the tables, and all data already present will be maintained. Comment out the function you do not need depending on the situation.

npm start will start a local server using nodemon at port 3456.

If you want to deploy your code onto heroku, follow the tutorial here: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

## Requirements

- Node v8.1.2
- npm v5.0.3
- ElephantSQL database
- auth0 account
- heroku account

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
