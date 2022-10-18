# 
# 🛍️ Wamppy: A Storefront Backend Project. 🛍️

This project is a Back-End Nodejs online store. The API in this project are RESTful APIs. 

I have used Postgress database. For more information and API route please check the [REQUIREMENT.md](REQUIREMENTS.md) 

## 🏁 Installation Instructions:
In this section, you can find all the package that I have used. You can simply ``` npm i ``` or ``` yarn ``` to install them all from my [package.json](package.json)  file

`yarn` or `npm install`

### 📦 Packages:

Here are some of the few packages that were installed.

#### typescript
`npm i -D typescript`

#### express
`npm i -S express`
`npm i -D @types/express`

#### db-migrate
`npm install -g db-migrate`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

#### jasmine
`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

## 🗃️ Set up Database:

### 🚀 Create Databases:

You have to create the databases for dev and test.

- Create a postgres user with username postgres and password `postgres`
- In psql run the following to create a user 
    - `CREATE USER postgres WITH PASSWORD 'postgres';`

- `psql -U postgres` first. This commened will connect you to the postgres as a root user. 
- In psql run the following to create the dev and test database
    - `CREATE DATABASE shopping;`
    - `CREATE DATABASE shopping_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c shopping`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
    - Grant for test database
        - `\c shopping_test`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`yarn dev-up`

!['migrate database'](./docs/migrate_up.png)

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing but not in production. 
```
DB_NAME = shopping
DB_NAME_TEST = shopping_test
DB_HOST = localhost
DB_PORT = 5432
DB_USER = shopping_user
DB_PASS= password123

BCRYPT_PASSWORD=my-name-is-enow-2021
SALT_ROUNDS=10
TOKEN_TEST = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.J8BgsyqA3Y6F71NXbfuYIfRVuvRa_qb08RStxrCVhlQ
JWT_SECRET = 5ae8adc9731627905ebf0905dbe4a114ba7d8354ae1796772dfa523a2142761b78d48cbfcd98000bb94fbdbd8147f30de6b3484c3a060d389068204df6a50630
ENVI = dev
```

## Start App
`yarn watch` or `npm run watch`

!['start server'](./docs/start.png)

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`yarn test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

!['test 1'](docs/test1.png)
!['test 2'](docs/test2.png)
!['test 3'](docs/test3.png)


## Important Notes 

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing. 


### Changing Enviroment to testing 
I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database. 

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `yarn test` will set this variable to `testing` in the package.json. Here is the complete command.
`npm run test-up && cross-env ENVI=test jasmine-ts && npm run test-down`

The first command migrates all tables then the second command changes the enviroment variable `ENVI` to testing, then the jasmine is run and then after testing, the database is reset. 

Note the `cross-env` in command above. Since this may have some issues in Windows, I had to use this pakcage [cross-env](https://www.npmjs.com/package/cross-env) to take care of it. This permits the changing of environment variable this way to work for all platforms
