const { gql } = require('apollo-server-express');

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User!
  }

  type Mutation {
    register(input: UserInput!): AuthPayload!
    login(input: UserInput!): AuthPayload!
  }
`;

module.exports = userSchema;
