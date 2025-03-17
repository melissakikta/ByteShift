import { GraphQLError } from 'graphql';
import { signToken } from '../services/auth';
import { User } from '../models/index';

// Define types for the arguments
interface AddUserArgs {
    username: string;
    email: string;
    password: string;
}

interface LoginUserArgs {
    email: string;
    password: string;
}

interface AddPostArgs {
	username: string; // The username of the user who created the post, required to be automatically populated
	type: string; // The type of the post, required to be automatically populated
	title: string; // The title of the post
	content: string; // The content of the post
	link: string; // The link of the post
	imgURL: string; // The image URL of the post
	likes: number; // The number of likes the post has
	dislikes: number; // The number of dislikes the post has
	comments: string[]; // The comments on the post TODO: Change to Comment type or ID?
}

const resolvers = {
	Query: {
	},
	Mutation: {
        addUser: async (_parent: any, { username, email, password }: AddUserArgs) => {
            // Create a new user with the provided username, email, and password
            const user = await User.create({ username, email, password });


            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });

            // If no user is found, throw an GraphQLError
            if (!user) throw new GraphQLError('Could not authenticate user.');

            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, throw an GraphQLError
            if (!correctPw) throw new GraphQLError('Could not authenticate user.');

            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },
	},
};

export default resolvers;