import mongoose from 'mongoose';
import { User, Post, Comment } from '../models'; // Adjusted the path to point to the correct location
import db from '../dbconfig/connection.js'; // Adjusted the path to point to the correct database connection file
import { commentsData, postsData, usersData } from './data'; // Import the sample data

async function seed() {
    try {
        // Connect to MongoDB
        await db // Wait for the connection to be established

        // Clear existing data
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        // Create new comments
        const comments = await Comment.insertMany(commentsData);

        // Create new posts with associated comments
        const posts = await Post.insertMany(
            postsData.map((post: typeof postsData[0]) => ({
                ...post,
                comments: comments.map(comment => comment._id), // Associate all comments with each post
            }))
        );

        // Create new users and associate their posts
        const users = await User.insertMany(
            usersData.map((user: typeof usersData[0], index: number) => ({
                ...user,
                posts: posts[index] ? [posts[index]._id] : [], // Associate user with their post
            }))
        );

        console.log('Users generated: ', users);

        console.log('Seeding completed!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
    }
}

// Execute the seed function
seed();