import React from 'react';
import type PostProps from '../../interfaces/Post';
import type CommentProps from '../../interfaces/Comment';
import Comment from '../Comment/Comment';

import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import { QUERY_GET_COMMENTS_FOR_POST } from '../../utils/queries';
import { LIKE_POST, DISLIKE_POST } from '../../utils/mutations';

const Post = ({ post }: { post: PostProps }): JSX.Element => {
	// query for comments, likes, and dislikes and store in state
	// array of comments, query for 3 most recent comments
	const [comments, setComments] = useState<CommentProps[]>([]);

	// todo add mutation and tracking for likes and dislikes onClick
	const [likes, setLikes] = useState<number>(0);
	const [dislikes, setDislikes] = useState<number>(0);

	// todo finish building like and dislike workflow in app (update state for user, send mutation to server)
	function updateLikes() {
		// update likes in database
		const [addLike] = useMutation(LIKE_POST, {
			variables: { postId: post._id },
		});
		setLikes(likes + 1);
		addLike();
	}

	function updateDislikes() {
		// update dislikes in database
		const [addDislike] = useMutation(DISLIKE_POST, {
			variables: { postId: post._id },
		});
		setDislikes(dislikes + 1);
		addDislike();
	}

	function generateBlogPost() {
		return (
			<>
				<div className='post-header'>
					<h3>{post.title}</h3>
					<span>{post.username}</span>
				</div>
				<div>{post.content}</div>
				{post.imgURL ? <img src={post.imgURL} /> : <></>}
				<button type='button' onClick={() => updateLikes()}>likes ({post.likes})</button>
				<button type='button' onClick={() => updateDislikes()}>dislikes ({post.dislikes})</button>
				<div>
					{comments.map((comment) => (
						<Comment comment={comment} />
					))}
				</div>
			</>
		);
	}

	function generateCodePost() {
		return (
			<>
				<div className='post-header'>
					<h3>{post.title}</h3>
					<span>{post.username}</span>
				</div>
				<code>{post.content}</code>
				<button type='button' onClick={() => updateLikes()}>likes ({post.likes})</button>
				<button type='button' onClick={() => updateDislikes()}>dislikes ({post.dislikes})</button>
				<div>
					{comments.map((comment) => (
						<Comment comment={comment} />
					))}
				</div>
			</>
		);
	}

	function generateLinkPost() {
		return (
			<>
				<div className='post-header'>
					<h3>{post.title}</h3>
					<span>{post.username}</span>
				</div>
				<div>{post.content}</div>
				<iframe src={post.link} title="user shared embedded link"></iframe>
				<button type='button' onClick={() => updateLikes()}>likes ({post.likes})</button>
				<button type='button' onClick={() => updateDislikes()}>dislikes ({post.dislikes})</button>
				<div>
					{comments.map((comment) => (
						<Comment comment={comment} />
					))}
				</div>
			</>
		);
	}
	
	useQuery(QUERY_GET_COMMENTS_FOR_POST, {
		variables: { postId: post._id },
		onCompleted: (data) => {
			setComments(data.getCommentsForPost.map((comments: CommentProps) => ({
				_id: comments._id,
				username: comments.username,
				content: comments.content,
				createdAt: comments.createdAt
			})));
		}
	});

	if (!post) return <div>No post to display</div>;
	if (post.type === 'blog') {
		generateBlogPost();
	}
	if (post.type === 'code') {
		generateCodePost();
	}
	if (post.type === 'link') {
		generateLinkPost();
	}
	return <div>Unknown post type</div>;
};

export default Post;