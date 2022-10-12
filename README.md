# nasa
An exercise project on NodeJS and the CI.

![build workflow](https://github.com/hasan-aga/nasa/actions/workflows/node.yml/badge.svg)
![tests workflow](https://github.com/hasan-aga/nasa/actions/workflows/tests.yml/badge.svg)

## How To Run
On the root directory run `npm run build` to build the frontend. Then run `npm start --prefix server` to start the backend. A server will start listening on port 8000 so you can access our frontend on `localhost:8000` for example.

## How to ship as a docker container
install docker on your machine and run `docker build . -t <name>` which will build a docker image. To run the image use`docker run -p 80:8000 <name>`.

## Hosting on AWS EC2 virtual machine
the image that we created above exists only on our machine. we can take advantage of docker hub and upload the image so we can access it from everywhere.

after logging in using `docker login` we can use `docker push`

### EC2 security rules
A list of ports that you need to allow:
  1. port 22 for SSH
  2. port 80 for HTTP where our webserver runs
  
Then after launching the VM, install docker and use `docker run --restart=always -p 80:8000 <name>` to pull and run the image from your docker hub repo.
