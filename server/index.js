require('dotenv').config()
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const {zipModel} = require("./db/db");
const PORT = process.env.PORT || 8000;

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Zip {
            _id: String!
            city: String!
            state: String!
            loc: [Float]!
            pop: Int!
        }

        type Query {
            getAllData: [Zip]
            getZipByCity(city: String!): Zip
        }

    `,
    resolvers: {
      Query: {
        getAllData: async () => await zipModel.find(),
        getZipByCity: async (parent, { city }) => zipModel.findOne({city: city})
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => console.log("Serevr Started at PORT", PORT));
}

startServer();
