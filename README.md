# express-mongodb-graphql-server
Express MongoDB GraphQL Server

First, create .env file and add the following variable:
```bash
MONGO_CLOUD_URL=mongodb+srv://<dbUser>:<password>@g1.w0g0vec.mongodb.net/<database>
```
You can use MongoDB cloud to create a new project and then to get the required URL
https://www.mongodb.com/


To run Express GraphQL Server (The server will run by default on http://localhost:5001/graphql):
```bash
npm run mongo-server
```
