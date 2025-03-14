import { gql } from '@apollo/client';

export const QUERY_GET_USERS_ALL = gql`
  query getUsers($username: String) {
    getUsers(username: $username) {
      _id
      username
      email
      posts {
        _id
        type
        title
        content
        imgURL
        likes
        dislikes
        comments {
          _id
          username
          content
        }
      }
      comments {
        _id
        username
        content
      }
      likedPosts {
        _id
        type
        title
        content
        imgURL
        likes
        dislikes
        comments {
          _id
          username
          content
        }
      }
      dislikedPosts {
        _id
        type
        title
        content
        imgURL
        likes
        dislikes
        comments {
          _id 
          username
          content
        }
      }
    }
  }
`;

export const QUERY_GET_USERS = gql`
  query getUsers($username: String) {
    getUsers(username: $username) {
      _id
      username
      email
      posts {
        _id
        title
      }
    }
  }
`;

export const QUERY_ME = gql``