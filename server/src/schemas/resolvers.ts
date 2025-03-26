import { GraphQLError } from 'graphql';
import { signToken } from '../services/auth.js';
import { User, Post, Comment } from '../models/index.js';
import { Schema } from 'mongoose';

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
	link?: string; // The link of the post
	imgURL?: string; // The image URL of the post
	// Commented out bc likes, dislikes, and comments are automatically populated
    // likes: number; // The number of likes the post has
	// dislikes: number; // The number of dislikes the post has
	// comments: CommentType[]; // The comments on the post TODO: Change Comment type or ID?
}

interface AddCommentArgs {
    username: string; // The username of the user who created the comment, required to be automatically populated
    postId: string; // The ID of the post the comment is on
    content: string; // The content of the comment
}

const resolvers = {
	Query: {
        getUsersAllData: async () => {
            return await User.find().populate('posts');
        },

        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return await User.findById(context.user._id).populate('posts').populate('comments');
            }
            throw new GraphQLError('User not logged in');
        },

        getPosts: async () => {
            return await Post.find().populate('comments');
        },

        getCommentsForPost: async (_parent: any, { postId }: { postId: string }) => {
            return await Comment.find({ post: postId });
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
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new GraphQLError('Incorrect email or password');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        addPost: async (_parent: any, {postInput}: {postInput: AddPostArgs}) => {
            const user = await User.findOne({ username: postInput.username });
            if (!user) throw new GraphQLError('User not found');

            const newPost = await Post.create(postInput);
            user.posts.push(newPost._id as Schema.Types.ObjectId);
            await user.save();
            return user.populate('posts');
        },

        addComment: async (_parent: any, {commentInput}: {commentInput: AddCommentArgs}) => {
            const post = await Post.findById(commentInput.postId);
            if (!post) throw new GraphQLError('Post not found');

            const newComment = await Comment.create(commentInput);
            post.comments.push(newComment._id as Schema.Types.ObjectId);
            await post.save();
            return post.populate('comments');
        },

        likePost: async (_parent: any, { postId }: { postId: string }) => {
            return await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: 1 } },
                { new: true }
            );
        },

        dislikePost: async (_parent: any, { postId }: { postId: string }) => {
           return await Post.findByIdAndUpdate(
                postId,
                { $inc: { dislikes: 1 } },
                { new: true }
           );
        },

        addToLikedPosts: async (_parent: any, { userId, postId }: { userId: string, postId: string }) => {
            return await User.findByIdAndUpdate(
                userId,
                { $addToSet: { likedPosts: postId } },
                { new: true }
            ).populate('likedPosts');
        },

        addToDislikedPosts: async (_parent: any, { userId, postId }: { userId: string, postId: string }) => {
            return await User.findByIdAndUpdate(
                userId,
                { $addToSet: { dislikedPosts: postId } },
                { new: true }
            ).populate('dislikedPosts');
        },

        deletePost: async (_parent: any, { postId }: { postId: string }) => {
            const post = await Post.findById(postId);
            if (!post) throw new GraphQLError('Post not found');

            await Post.deleteOne({ _id: postId });
            await User.findByIdAndUpdate({ username: post.username }, { $pull: { posts: postId } });

            return await User.findOne({ username: post.username }).populate('posts');
        },

        deleteComment: async (_parent: any, { postId, commentId }: { postId: string, commentId: string }) => {
            await Comment.findByIdAndDelete(commentId);
            return await Post.findByIdAndUpdate(
                postId,
                { $pull: { comments: commentId } },
                { new: true }
            ).populate('comments');
        },
	},
};

export default resolvers;