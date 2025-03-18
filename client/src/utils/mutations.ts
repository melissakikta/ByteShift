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
    link
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

export const LIKE_POST = gql`
mutation likePost($postId: ID!) {
  likePost(postId: $postId) {
    _id
    title
    likes
    username
  }
}
`;

export const DISLIKE_POST = gql`
mutation dislikePost($postId: ID!) {
  dislikePost(postId: $postId) {
    _id
    title
    dislikes
    username
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($commentInput: AddCommentInput!) {
  addComment(commentInput: $commentInput) {
    _id
    username
    content
    createdAt
  }
}
`;

export const DELETE_POST = gql`
mutation deletePost($postId: ID!) {
  deletePost(postId: $postId) {
    _id
    username
  }
}
`;

export const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    _id
    username
  }
}
`;