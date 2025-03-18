import React from 'react';
import type PostProps from '../../interfaces/Post';
import type CommentProps from '../../interfaces/Comment';
import { useState } from 'react';
import Comment from '../Comment/Comment';
import { useMutation } from '@apollo/client';
import { QUERY_GET_POST } from '../../utils/queries';
import { LIKE_POST, DISLIKE_POST } from '../../utils/mutations';

const Post = ({ post }: { post: PostProps }): JSX.Element => {
	// query for comments, likes, and dislikes and store in state
	// array of comments, query for 3 most recent comments
	const [comments, setComments] = useState<Comment[]>([]);

	// todo add mutation and tracking for likes and dislikes onClick
	const [likes, setLikes] = useState<number>(0);
	const [dislikes, setDislikes] = useState<number>(0);

	// todo finish building like and dislike workflow in app (update state for user, send mutation to server)
	function updateLikes() {
		// update likes in database
		const [addLike] = useMutation(LIKE_POST, {
			variables: { postId: post._id },
			refetchQueries: [{ query: QUERY_GET_POST }],
		});
		setLikes(likes + 1);
		addLike();
	}

	function updateDislikes() {
		// update dislikes in database
		const [addDislike] = useMutation(DISLIKE_POST, {
			variables: { postId: post._id },
			refetchQueries: [{ query: QUERY_GET_POST }],
		});
		setDislikes(dislikes + 1);
		addDislike();
	}

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
				<button type='button' onClick={() => updateLikes()}>likes ({post.likes})</button>
				<button type='button' onClick={() => updateDislikes()}>dislikes ({post.dislikes})</button>
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