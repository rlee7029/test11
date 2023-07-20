const { gql } = require('apollo-server-express');

const taskSchema = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
    userId: ID!
  }

  input TaskInput {
    title: String!
    description: String!
    completed: Boolean
    userId: ID!
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
    tasksByUserId(userId: ID!) : [Task!]!
    completedTasks(userId: ID!) : [Task!]!
    incompleteTasks(userId: ID!) : [Task!]!
  
  }

  type Mutation {
    createTask(input: TaskInput!): Task!
    updateTask(id: ID!, input: TaskInput!): Task!
    deleteTask(id: ID!): Task!
  }
`;

module.exports = taskSchema;
