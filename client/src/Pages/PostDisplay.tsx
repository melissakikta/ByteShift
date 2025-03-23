import React from 'react';
import Post from '../components/Post/Post';
import type PostType from '../interfaces/Post';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GET_POSTS } from '../utils/queries';
import { Row, Col } from 'antd';

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

	const { data, loading, error } = useQuery(QUERY_GET_POSTS);
	// todo remove console log after testing data returns for query
	console.log(data);
	
	//Set posts if the query return data
	if (data && data.posts !== posts) {
		setPosts(data.posts);
	}

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			<Row gutter={[16, 16]}>
				{posts.map((post) => (
					<Col xs={24} sm={12} md={8} lg={6} key={post._id}>
						<Post post={post} /> {/* Pass post data to Post Component */}
					</Col>
				))}
			</Row>
		</div>
	);
};

export default PostDisplay;