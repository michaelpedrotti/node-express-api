# 1- Express.js API Rest

It is a simple node application provided as Rest API. It can be used with docker or serverless.

# 2 - Tech

Uses a number of open source projects to work properly:

- `express.js`
- `mysql`
- `node.js` - v16.x

# 3 - Development

You can use docker or serverless to start your new instance.

## 3.1 - Docker

You need to create a image local to run a aplication. I created 3 images, those represent stages like stable, development and production.

Create a stable( latest ) image tag:

```sh
docker build -t pedrotti/node:express .
```

Create a stable( latest ) image tag:

```sh
docker build -t pedrotti/node:express .
```

Create a new tag with updated source code inside:

```sh
docker build --no-cache -f Dockerfile.prod -t pedrotti/node-express:v1.0 .
```

Create a developement tag using nodemon:

```sh
docker build --no-cache -f Dockerfile.dev -t pedrotti/node-express:dev .
```
That tag is already setted on `docker-compose.yml`.

Start a new instance at root project.

```sh
docker-compose up -d
```

Create e charge a new instance of database.

```sh
docker exec node-api npx sequelize --help
docker exec node-api npx sequelize db:migrate
docker exec node-api npx sequelize db:seed:all 
```

Watch logs from nodemon:

```sh
docker logs --follow node-api 
```

## 3.2 - Serverless

Install Serverless as global package.

```sh
npm install -g serverless
```

Install plugins to start localhost.

```sh
npm install serverless-offline --save-dev
npm install serverless-sequelize-migrations --save-dev
```

Startup a new instance.

```sh
serverless offline
```

### 3.2.1 - Database

Serverless will bind in port 3000 on localhost. You could create a new instance of database at localhost too. Install a `mysql-server` package or using docker mysql bind por 5306 to localhost.

Create a new instance with docker:

```sh
docker run -d --name mysql -p 5306:5306 -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

Charge that instance with migrations:

```sh
serverless migrations list
serverless migrations up
```

# 4 - Deploy

## 4.1 - Docker

**Todo**: expand this topic.

## 4.2 - Serverless

If you are trying to use AWS Lambda, first you need to install **AWS CLI** and configure **Access key ID** and **Secret acess key** from a IAM account.

```sh
aws configure
```

Serverless deploy will translate `serverless.yml` configs into **AWS CloudFormation** commands.

```sh
serverless deploy
```

### 4.2.1 - Package

**Todo**: expand this topic.

### 4.2.2 - Layer

**Todo**: expand this topic.

# 5 - References

- [AWS CLI](https://aws.amazon.com/pt/cli/) - AWS Command Line Interface
- [Serverless](https://www.serverless.com/) - Cloud computing execution model
- [Express.js](https://expressjs.com) -  A back end web application framework for building RESTful APIs
- [Lambda Layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) - Creating and sharing Lambda layers