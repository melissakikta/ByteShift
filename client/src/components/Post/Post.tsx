import React from 'react';
import type PostProps from '../../interfaces/Post';
import type CommentProps from '../../interfaces/Comment';
import { useState } from 'react';
import Comment from '../Comment/Comment';

const Post = ({ post }: { post: PostProps }): JSX.Element => {
	// query for comments, likes, and dislikes and store in state
	// array of comments, query for 3 most recent comments
	// const [comments, setComments] = useState<Comment[]>([]);

	// todo add mutation and tracking for likes and dislikes onClick
	// const [likes, setLikes] = useState<number>(0);
	// const [dislikes, setDislikes] = useState<number>(0);

	

	if (!post) return <div>No post to display</div>;
	if (post.type === 'blog') {
		return (
			<>
				<div className='post-header'>
					<h3>{post.title}</h3>
					<span>{post.username}</span>
				</div>
				<div>{post.content}</div>
				{ post.imgURL ? <img src={post.imgURL} /> : <></> }
				<button type='button' onClick={setLikes}>likes ({post.likes})</button>
				<button type='button' onClick={setDislikes}>dislikes ({post.dislikes})</button>
				<div>
					
				</div>
			</>
		);
	}
	if (post.type === 'code') {
		return (
			<>
				<div className='post-header'>
					<h3>{post.title}</h3>
					<span>{post.username}</span>
				</div>
				<code>{post.content}</code>
			</>
		);
	}
	if (post.type === 'link') {
		return (
			<>
				<div className='post-header'>
					<h3>{post.title}</h3>
					<span>{post.username}</span>
				</div>
				<div>{post.content}</div>
				<iframe src={post.link} title="user shared embedded link"></iframe>
			</>
		);
	}
	return <div>Unknown post type</div>;
};

export default Post;