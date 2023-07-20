import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: TaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      title
      description
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: UserInput!) {
    login(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;
