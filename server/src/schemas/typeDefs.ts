const typeDefs = `#graphql
  	type User {
    	_id: ID!
    	username: String!
    	email: String!
    	password: String!
    	posts: [Post]!
		likedPosts: [Post]!
		dislikedPosts: [Post]!
  	}

	type Post {
		_id: ID!
		username: String!
		type: String!
		title: String!
		content: String!
		link: String
		imgURL: String
		likes: Number
		dislikes: Number
		comments: [Comment]
		createdAt: String
	}

	type Comment {
		_id: ID!
		username: String!
		content: String!
		createdAt: String
	}
    
	type Auth {
		token: ID!
		user: User
	}

	input AddUserInput {
		username: String!
		email: String!
		password: String!
	}

	input AddPostInput {
		username: String!
		type: String!
		title: String!
		content: String!
		link: String
		imgURL: String
	}

	input AddCommentInput {
		username: String!
		content: String!
	}

  type Query {
		getUsersAllData: [User]
		#getUsers: [User]
		me: User
		# getUser(username: String!): User
		getPosts: [Post]
		getCommentsForPost(postId: ID!): [Comment]
  	}

  	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(userInput: AddUserInput!): Auth
		addPost(postInput: AddPostInput!): User

		likePost(postId: ID!): Post
		dislikePost(postId: ID!): Post

		# these two mutations are for the user who liked or disliked a post to be tracked to prevent them from liking or disliking the same post multiple times
		addToLikedPosts(postId: ID!): User
		addToDislikedPosts(postId: ID!): User

		addComment(commentInput: AddCommentInput!): Post
		deletePost(postId: ID!): User
		deleteComment(postId: ID!, commentId: ID!): Post
  	}
`;

export default typeDefs;