import { GraphQLError } from 'graphql';
import { signToken } from '../services/auth';
import type CommentType from '../interfaces/Comment';
import { User, Post, Comment } from '../models/index';
import { get } from 'http';

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
	comments: CommentType[]; // The comments on the post TODO: Change Comment type or ID?
}

const resolvers = {
	Query: {
        getUsers: async () => {
            const users = await User.find();
            return users;
        },
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id });
                return user;
            }
            return null;
        },
        getPosts: async () => {
            const posts = await Post.find();
            return posts;
        },
        getCommentsForPost: async (_parent: any, { postId }: { postId: string }) => {
            const comments = await Comment.find({ post: postId });
            return comments;
        }
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
        addPost: async (_parent: any, {postInput}: {postInput: AddPostArgs}) => {
            // Create a new post with the provided information
            const post = await Post.create(postInput);

            // Return the post
            return post;
        },
        addComment: async (_parent: any, {commentInput}: {commentInput: CommentType}) => {
            // Create a new comment with the provided information
            const comment = await Comment.create(commentInput);

            // Return the comment
            return comment;
        },
        likePost: async (_parent: any, { postId }: { postId: string }) => {
            // Find the post by ID
            const post = await Post.findById(postId);

            // If the post doesn't exist, throw an error
            if (!post) {
                throw new Error('Post not found');
            }

            // Increment the likes field of the post
            post.likes++;

            // Save the post
            await post.save();

            // Return the updated post
            return post;
        },
        dislikePost: async (_parent: any, { postId }: { postId: string }) => {
            // Find the post by ID
            const post = await Post.findById(postId);

            // If the post doesn't exist, throw an error
            if (!post) {
                throw new Error('Post not found');
            }

            // Increment the dislikes field of the post
            post.dislikes++;    

            // Save the post
            await post.save();

            // Return the updated post
            return post;
        },
        addToLikedPosts: async (_parent: any, { postId }: { postId: string }) => {
            // Find the user by ID
            const user = await User.findById(postId);

            // If the user doesn't exist, throw an error
            if (!user) {
                throw new Error('User not found');
            }

            // Add the post ID to the likedPosts array of the user
            user.likedPosts.push(postId);

            // Save the user
            await user.save();

            // Return the updated user
            return user;
        },
        addToDislikedPosts: async (_parent: any, { postId }: { postId: string }) => {
            // Find the user by ID
            const user = await User.findById(postId);

            // If the user doesn't exist, throw an error
            if (!user) {
                throw new Error('User not found');
            }

            // Add the post ID to the dislikedPosts array of the user
            user.dislikedPosts.push(postId);

            // Save the user
            await user.save();

            // Return the updated user
            return user;
        },
        deletePost: async (_parent: any, { postId }: { postId: string }) => {
            // Find the post by ID
            const post = await Post.findById(postId);

            // If the post doesn't exist, throw an error
            if (!post) {
                throw new Error('Post not found');
            }

            // Delete the post            
            await Post.deleteOne({ _id: postId });

            // Return the deleted post
            return post;
        },
        deleteComment: async (_parent: any, { postId, commentId }: { postId: string, commentId: string }) => {
            // Find the comment by ID
            const comment = await Comment.findById(commentId);

            // If the comment doesn't exist, throw an error
            if (!comment) {
                throw new Error('Comment not found');
            }

            // Delete the comment
            await Comment.deleteOne({ _id: commentId });

            // Return the deleted comment
            return comment;
        },
	},
};

export default resolvers;