# nasa
An exercise project on NodeJS and the CI.

![build workflow](https://github.com/hasan-aga/nasa/actions/workflows/node.yml/badge.svg)
![tests workflow](https://github.com/hasan-aga/nasa/actions/workflows/tests.yml/badge.svg)

## How To Run
On the root directory run `npm run build` to build the frontend. Then run `npm start --prefix server` to start the backend. A server will start listening on port 8000 so you can access the homepage on `localhost:8000`.

## Running from Docker image
I have created a docker image called hasanaga/nasa-project which you can use to quickly launch this app by running `docker run --restart=always -p 80:8000 hasanaga/nasa-project` which creates a webserver at port 80 accessible at `localhost` (the default port is 80 so you don't have to type it)

## How to create your own docker image of the project
Install docker on your machine and run `docker build . -t <name>` which will build a docker image. To run the image use`docker run -p 80:8000 <name>`.

## Hosting on AWS EC2 virtual machine
The image that was created above exists only on your local machine. You can take advantage of docker hub and upload the image so it can be accessed from everywhere.

After logging in using `docker login`, use `docker push`. Your image will be in a private docker repo (you have to login to access it).

### EC2 security rules
Create a rule that allows traffic to port 80 since that is where our webserver will be listening.
  
Then after launching the VM, install docker and use `docker run --restart=always -p 80:8000 <name>` to pull and run the image from your docker hub repo. Make sure that you use the same name that you chose in the previous steps.
