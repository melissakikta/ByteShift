const typeDefs = `
  	type User {
    	_id: ID!
    	username: String!
    	email: String!
    	password: String!
    	posts: [Post]!
			comments: [Comment]!
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

	input PostInput {
		username: String!
		type: String!
		title: String!
	}

  	type Query {
		getUsersAll: [User]
		getUsers: [User]
		me: User
		getUser(username: String!): User
		getPosts: [Post]
		getCommentsForPost: [Comment]
  	}

  	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(userInput: AddUserInput!): Auth
		addPost(postInput: AddPostInput!): User
		likePost(postId: ID!): Post
		dislikePost(postId: ID!): Post
		addComment(commentInput: AddCommentInput!): Post
		deletePost(postId: ID!): User
		deleteComment(postId: ID!, commentId: ID!): Post
  	}
`;

export default typeDefs;