import React from 'react';
import Post from '../components/Post/Post';
import type PostType from '../interfaces/Post';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GET_POSTS } from '../utils/queries';
import { Row, Col, Card, Button } from 'antd';

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
	
	if (!loading) {
		if (data.getPosts.length !== 0 && data.getPosts !== posts) {
			setPosts(data.getPosts);
		} else {
			console.log("No data returned from query");
		}
	}

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			<Row gutter={[16, 16]}>
				{posts.map((loadingPost) => (
					<Col xs={24} sm={24} md={12} lg={8} xl={8} key={loadingPost._id}>
						<Card
							style={{ height: 700, 
								display: 'flex', 
								flexDirection: 'column', 
								border: 'none', 
								background: 'transparent',
								boxShadow: 'none',
								overflow: 'hidden', 
							}}
						>
							<div 
								style={{
									height: '650px',
									overflowY: 'auto',
									padding: '10px',
								}}
							>

							<Post post={loadingPost} /> {/* Pass post data to Post Component */}
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default PostDisplay;