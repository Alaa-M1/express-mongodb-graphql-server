const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();
const app = express();
const secretKey="dszfsdfgsgsdfgdfg";//this should be in .env file
const MONGO_CLOUD_URL = process.env.MONGO_CLOUD_URL;
if (!MONGO_CLOUD_URL) {
  throw new Error("MongoDB Server URL is not available");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_CLOUD_URL);
mongoose.connection
  .once("open", () => console.log("Successfully connected to MongoDB"))
  .on("error", (error) => console.log("Error connecting to MongoDB:", error));


app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secretKey,
  store: MongoStore.create({
    mongoUrl: MONGO_CLOUD_URL
  })
}));

app.use(passport.initialize());
app.use(passport.session());


// const corsOptions = {
//   origin: baseUrl,
//   optionsSuccessStatus: 200,
// };

// app.use(cors());
// app.use(bodyParser.json());
app.use(
  "/graphql",
  createHandler({
    schema,
    graphiql: true,
    context:  ( req ) => req,
    
  })
);

app.listen(5001, () => {
  console.log('Listening');
});