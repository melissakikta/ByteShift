import mongoose from 'mongoose';
import { User, Post, Comment } from '../models/index'; // Adjust the import path as necessary
import seedData from './seedData.json';
import db from '../dbconfig/connection';
import { IUser } from '../models/user';
import { IPost } from '../models/Post';
import { IComment } from '../models/Comment';

const seedDatabase = async () => {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});

  const users: IUser[] = await User.insertMany(seedData.users);
  const posts: IPost[] = await Post.insertMany(seedData.posts);
  const comments: IComment[] = await Comment.insertMany(seedData.comments);

//   randomly assign comments to posts
  for (const comment of comments) {
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    randomPost.comments.push(comment._id as mongoose.Schema.Types.ObjectId);
    await randomPost.save();
  }

//   randomly assign posts to users
  for (const user of users) {
    const randomPosts = posts.filter(post => post.username === user.username);
    user.posts.push(...randomPosts.map(post => post._id as mongoose.Schema.Types.ObjectId));
    await user.save();
  }


  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
