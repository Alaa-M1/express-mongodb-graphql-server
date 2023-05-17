const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const MONGO_CLOUD_URL = process.env.MONGO_CLOUD_URL;
if (!MONGO_CLOUD_URL) {
  throw new Error("MongoDB Server URL is not available");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_CLOUD_URL);
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB server instance."))
  .on("error", (error) => console.log("Error connecting to MongoDB server:", error));

// const corsOptions = {
//   origin: baseUrl,
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(bodyParser.json());
app.use(
  "/graphql",
  createHandler({
    schema,
    graphiql: true,
  })
);

app.listen(5001, () => {
  console.log('Listening');
});