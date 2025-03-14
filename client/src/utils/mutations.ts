import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      _id
      username
    }
    token
      }
}
`;

export const ADD_USER = gql`
mutation addUser($input: AddUserInput!) {
  addUser(userInput: $input) {
    user {
      _id
      username
    }
    token
  }
}
`;

export const ADD_POST = gql`
mutation addPost($input: AddPostInput!) {
  addPost(postInput: $input) {
    _id
    username
    type
    title
    content
    imgURL
    reactions {
      _id
    }
    comments {
      _id
      username
      content
      createdAt
    }
    createdAt
  }
}
`;

export const ADD_REACTION = gql`
mutation addReaction($input: AddReactionInput!) {
  addReaction(reactionInput: $input)