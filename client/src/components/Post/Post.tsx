import React from 'react';
import type Post from '../../interfaces/Post';

const Post = ({ post }: { post: Post }): JSX.Element => {
	if (!post) return <div>No post to display</div>;
	if (post.type === 'blog') {
		return (
			<>
				<div>{post.title}</div>
				<div>{post.content}</div>
				{post.imgURL ?}
			</>
			<div>{post.title}</div>
		);
	}
	if (post.type === 'code') {
		return (
			<div>{post.title}</div>
		);
	}
	if (post.type === 'link') {
		return (
			<div>{post.title}</div>
		);
	}
	return <div>Unknown post type</div>;
};