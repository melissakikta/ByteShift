import React from 'react';
import Post from '../components/Post/Post';
import type PostType from '../interfaces/Post';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GET_POSTS } from '../utils/queries';

const PostDisplay: React.FC = () => {
	const defaultPost: PostType = {
		_id: "123",
		username: "test user for default post",
		type: "link",
		title: "test title",
		content: "test content",
		link: "https://placehold.co/",
		imgURL: "https://placehold.co/200x200",
		likes: 11,
		dislikes: 22,
		comments: [],
		createdAt: "1742648022878",
	};

	const [posts, setPosts] = useState<PostType[]>([defaultPost]);

	const postList = useQuery(QUERY_GET_POSTS);
	// todo remove console log after testing data returns for query
	console.log(postList.data);
	setPosts(postList.data.posts);

	return (
		<>
			<div>
				{posts.map((post) => (
					<Post post={post} />
				))}
			</div>
		</>
	);
};

export default PostDisplay;