const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const productdb = require("./db/db");
const { USERS } = require("./user");
const { TODOS } = require("./todo");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Product {
            id: ID!
            type: String!
            item: String!
            ratings: [Int]!
        }

        type Query {
            getAllProducts: [Product]
            getProduct(id: ID!): Product
        }

    `,
    resolvers: {
      Query: {
        getAllProducts: async () => await productdb.find(),
        getProduct: async (parent, { id }) => productdb.find({_id: id}),
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
}

startServer();
