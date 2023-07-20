import { gql } from '@apollo/client';

export const GET_TASKS = gql`
query {
  tasks {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
    }
  }
`;

export const GET_TASKS_BY_USER_ID = gql`
  query GetTasksByUserId($userId: ID!) {
    tasksByUserId(userId: $userId) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;

export const GET_COMPLETED_TASKS_BY_USER_ID = gql`
  query GetCompletedTasksByUserId($userId: ID!) {
    completedTasks(userId: $userId) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;

export const GET_INCOMPLETE_TASKS_BY_USER_ID = gql`
  query GetIncompleteTasksByUserId($userId: ID!) {
    incompleteTasks(userId: $userId) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;