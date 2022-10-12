# nasa

An exercise project on NodeJS and the CI. The project consists of a React frontend and a Node/express backend. The backend will serve both the frontend and some of the APIs that the fronend uses. The data is persisted using MongoDB.

![build workflow](https://github.com/hasan-aga/nasa/actions/workflows/node.yml/badge.svg)
![tests workflow](https://github.com/hasan-aga/nasa/actions/workflows/tests.yml/badge.svg)

## How To Run

You will need to provide the following environemnt variables:

1. `MONGO_URL` which is the connection string of the MongoDB database.

On the root directory run `npm run build` to build the frontend. Then run `npm start --prefix server` to start the backend. A server will start listening on port 8000 so you can access the homepage on `localhost:8000`.


## How to create a docker image of the project

Install docker on your machine and run `docker build . -t <name>` which will build a docker image. To run the image use`docker run -p 80:8000 <name>`.

## Hosting on AWS EC2 virtual machine

The image that was created above exists only on your local machine. You can take advantage of docker hub and upload the image so it can be accessed from everywhere.

After logging in using `docker login`, use `docker push`. Your image will be in a private docker repo (you have to login to access it).

### EC2 security rules

Create a rule that allows traffic to port 80 since that is where our webserver will be listening.

Then after launching the VM, install docker and use `docker run --restart=always -p 80:8000 <name>` to pull and run the image from your docker hub repo. Make sure that you use the same name that you chose in the previous steps.

## Testing

Whenever you push to the repo, tests will be run on Github using actions. If you want to run tests locally you can do so by:

1. creating a mock database using docker `docker run --name mongoTestDB -p 27017:27017 -d mongo:4.4 `
2. setting the `MONGO_TEST_URL` environment variable so it point to the DB. In this case the connection string is `"mongodb://localhost:27017"`
3. running the tests using `npm run test` from the root of the project.
