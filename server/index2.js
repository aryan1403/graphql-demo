const express = require("express");

const { ApolloServer } = require("@apollo/server");

const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const { USERS } = require("./user");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
 
       type Product {
 
           id: ID!
 
           type: String!
 
           item: String!
 
           rating: [String!]
 
           userId: String!
 
       }
 


        type Query {
 
           getProduct(id: ID!): User
 
           getProduct: [Product]
 
       }
 


        type Mutation {
 
           createProduct(type: String!, item: String!, rating: [String!], userId: String!): Product
 
           updateProduct(id: ID!, type: String!, item: String!, rating: [String!], userId: String!): Product
 
           deleteProduct(id: ID!): Product
 
       }
 


    `,

    resolvers: {
      getProduct: async ({ id }) => {
        try {
          const product = await Product.findById(id);

          return;
          product;
        } catch (err) {
          throw new Error("Error retrieving product");
        }
      },

      getUsers: async () => {
        try {
          const products = await Product.find();

          return;
          products;
        } catch (err) {
          throw new Error("Error retrieving products");
        }
      },

      createProduct: async ({ type, item, rating, userId }) => {
        try {
          const prosuct = new Product({
            type,
            item,
            rating,
            userId,
          });

          await product.save();

          return;
          product;
        } catch (err) {
          throw new Error("Error creating product");
        }
      },

      updateProduct: async ({ id, type, item, rating, userId }) => {
        try {
          const product = await Product.findByIdAndUpdate(
            id,

            {
              type,
              item,
              rating,
              userId,
            },

            {
              new: true,
            }
          );

          return;
          product;
        } catch (err) {
          throw new Error("Error updating product");
        }
      },

      deleteProduct: async ({ id }) => {
        try {
          const product = await Product.findByIdAndRemove(id);

          return;
          product;
        } catch (err) {
          throw new Error("Error deleting procuct");
        }
      },
    },
  });

  app.use(bodyParser.json());

  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8001, () => console.log("Serevr Started at PORT 8001"));
}

startServer();
