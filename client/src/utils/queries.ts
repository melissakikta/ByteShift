import { gql } from '@apollo/client';

export const QUERY_GET_ALL_USERS_ALL_DATA = gql`
  	query getUsersAllData {
		getUsersAllData {
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
				}
			}
		}
  	}
`;

// no user list for friends or connections right now all users and data are already available above

// export const QUERY_GET_USERS = gql`
// 	query getUsers {
// 		getUsers {
// 			_id
// 			username
// 			email
// 			posts {
// 				_id
// 				title
// 			}
// 		}
// 	}
// `;

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
					createdAt
				}
				createdAt
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

// no single user query used right now

// export const QUERY_GET_USER = gql`
// 	query getUser($username: String!) {
// 		getUser(username: $username) {
// 			_id
// 			username
// 			email
// 			posts {
// 				_id
// 				type
// 				title
// 				content
// 				link
// 				imgURL
// 				likes
// 				dislikes
// 				comments {
// 					_id
// 					content
// 					username
// 					createdAt
// 				}
// 				createdAt
// 			}
// 			likedPosts {
// 				_id
// 				type
// 				title
// 				content
// 				link
// 				imgURL
// 				likes
// 				dislikes 
// 				comments {
// 					_id
// 					username
// 					content
// 					createdAt
// 				}
// 				createdAt
// 			}
// 			dislikedPosts {
// 				_id
// 				type
// 				title
// 				content
// 				link
// 				imgURL
// 				likes
// 				dislikes 
// 				comments {
// 					_id
// 					username
// 					content
// 					createdAt
// 				}
// 				createdAt
// 			}
// 		}
//   	}
// `;

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
	  			createdAt
	  		}
	  		createdAt
		}
  	}
`;

// no single post query used right now

// export const QUERY_GET_POST = gql`
// 	query getPost($postId: ID!) {
// 		getPost(postId: $postId) {
// 			_id
// 			username
// 			type
// 			title
// 			content
// 			link
// 			imgURL
// 			likes
// 			dislikes
// 			comments {
// 				_id
// 				username
// 				content
// 				createdAt
// 			}
// 			createdAt
// 		}
// 	}
// `;

export const QUERY_GET_COMMENTS_FOR_POST = gql`
  	query getPost($postId: ID!) {
		getPost(postId: $postId) {
			_id
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