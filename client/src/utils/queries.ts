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
        link
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
        link
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
        link
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        type
        title
        content
        link
        imgURL
        likes
        dislikes
        comments {
          _id
          content
          username
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
        link
        imgURL
        likes
        dislikes
      }
      dislikedPosts {
        _id
        type
        title
        content
        link
        imgURL
        likes
        dislikes
      }
    }
  }    
`;

export const QUERY_GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      _id
      username
      email
      posts {
        _id
        type
        title
        content
        link
        imgURL
        likes
        dislikes
        comments {
          _id
          content
          username
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
        link
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
        link
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

export const QUERY_GET_POSTS = gql`
  query getPosts {
    getPosts {
      _id
      username
      type
      title
      content
      link
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
`;

export const QUERY_GET_COMMENTS = gql`
  query getComments {
    getComments {
      _id
      username
      content
    }
  }
`;