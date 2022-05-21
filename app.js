const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({
  path: "./config/config.env"
});

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);


app.use("/", (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("server connected on port");
});
