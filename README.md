# Amazon-Prototype
A distributed Amazon Prototype application built using React, Node, Kafka, Redis, MongoDB and MySQL.

## Running

Make sure you have Node and npm installed. Also replace the .env-example in each of the following to .env and add the environment values.

### Frontend

```
cd frontend
npm install
npm start
```

### Backend

- Setup a Kafka cluster with 6 kafka topics: auth, analytics, profile, operations, cart and product.
- Install Redis and librdkafka. On Ubuntu, run the command: `sudo apt install librdkafka-dev redis-server`
- Run the backend server using the following commands:
```
cd backend
npm install
node index.js
```
