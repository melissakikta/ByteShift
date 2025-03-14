const typeDefs = `
  	type User {
    	_id: ID!
    	username: String!
    	email: String!
    	password: String!
    	posts: [Post]!
  	}

  	type Post {
		_id: ID!
		username: String!
		type: String!
		title: String!
		content: String!
		imgURL: String
		reactions: [Reaction]
		comments: [Comment]
		createdAt: String!
	}

	type Reaction {
	}

	type Comment {
		_id: ID!
		username: String!
		content: String!
		createdAt: String!
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
		getUsers: [User]
		getUserById(_id: ID!):
		getPosts: [Post]

  	}

  	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(userInput: AddUserInput!): Auth
		addPost(postInput: AddPostInput!): User
		addReaction(reactionInput: AddReactionInput!): Post
		addComment(commentInput: AddCommentInput!): Post
		deletePost(postId: ID!): User
  	}
`;

export default typeDefs;