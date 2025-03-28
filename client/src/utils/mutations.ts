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
	mutation addUser($userInput: AddUserInput!) {
		addUser(userInput: $userInput) {
			user {
				_id
				username
			}
			token
		}
	}
`;

export const ADD_POST = gql`
	mutation addPost($postInput: AddPostInput!) {
		addPost(postInput: $postInput) {
			_id
			username
			type
			title
			content
			link
			imgURL
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

export const ADD_TO_LIKED_POSTS = gql`
	mutation AddToLikedPosts($postId: ID!, $userId: ID!) {
		addToLikedPosts(userId: $userId) {
			username
			likedPosts {
				_id
			}
		}
	}
`;

export const ADD_TO_DISLIKED_POSTS = gql`
	mutation AddToDislikedPosts($postId: ID!, $userId: ID!) {
		addToDislikedPosts(userId: $userId) {
			username
			dislikedPosts {
				_id
			}
		}
	}
`;

export const ADD_COMMENT = gql`
mutation addComment($commentInput: AddCommentInput!) {
	addComment(commentInput: $commentInput) {
			_id
			comments {
				username
				content
			}
		}
	}
`;

export const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId) {
			_id
			username
			type
			title
			content
			link
			imgURL
		}
	}
`;

export const DELETE_COMMENT = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			_id
			username
			content
			createdAt
		}
	}
`;