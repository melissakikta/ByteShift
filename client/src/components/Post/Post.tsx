import React, { useState } from 'react';
import type PostType from '../../interfaces/Post';
import type CommentProps from '../../interfaces/Comment';
import Comment from '../Comment/Comment';
import AuthService from '../../utils/auth';

import { useMutation, useQuery } from '@apollo/client';
import { Button, Typography, Card, Row, Col } from 'antd';

import { QUERY_GET_COMMENTS_FOR_POST } from '../../utils/queries';
import { LIKE_POST, DISLIKE_POST, ADD_TO_LIKED_POSTS, ADD_TO_DISLIKED_POSTS } from '../../utils/mutations';

const { Title, Text } = Typography;

const Post = ({ post }: { post: PostType }): React.ReactElement => {
	// query for comments, likes, and dislikes and store in state
	// array of comments, query for 3 most recent comments
	const [comments, setComments] = useState<CommentProps[]>([]);

	// todo add mutation and tracking for likes and dislikes onClick
	const [likes, setLikes] = useState<number>(0);
	const [dislikes, setDislikes] = useState<number>(0);

	function loggedUser() {
		// return user from local storage
		const user = AuthService.getProfile();
		return user.data.id;
	}

	// todo finish building like and dislike workflow in app (update state for user, send mutation to server)
	function updateLikes() {
		// update likes in database
		const [addLike] = useMutation(LIKE_POST, {
			variables: { postId: post._id },
		});
		const [addToLikedPosts] = useMutation(ADD_TO_LIKED_POSTS, {
			variables: { postId: post._id, userId: loggedUser },
		});
		setLikes(likes + 1);
		addLike();
		addToLikedPosts();
	}

	function updateDislikes() {
		// update dislikes in database
		const [addDislike] = useMutation(DISLIKE_POST, {
			variables: { postId: post._id },
		});
		const [addToDislikedPosts] = useMutation(ADD_TO_DISLIKED_POSTS, {
			variables: { postId: post._id, userId: loggedUser },
		});
		setDislikes(dislikes + 1);
		addDislike();
		addToDislikedPosts();
	}

	function generateBlogPost() {
		return (
			<Card className="custom-menu-item" style={{ marginBottom: '20px', fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
				<Row>
					<Col span={24}>
						<Title level={3}>{post.title}</Title>
						<Text>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Text>{post.content}</Text>
						{post.imgURL && <img src={post.imgURL} alt="Post Image" style={{ width: '100%', marginTop: '10px' }} />}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Button type="primary" onClick={() => updateLikes()} style={{ marginRight: '10px' }}>
							Likes ({post.likes})
						</Button>
						<Button danger onClick={() => updateDislikes()}>
							Dislikes ({post.dislikes})
						</Button>
					</Col>
				</Row>
				<div>
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	function generateCodePost() {
		return (
			<Card className="custom-menu-item" style={{ marginBottom: '20px', fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
				<Row>
					<Col span={24}>
						<Title level={3}>{post.title}</Title>
						<Text>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<code>{post.content}</code>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Button type="primary" onClick={() => updateLikes()} style={{ marginRight: '10px' }}>
							Likes ({post.likes})
						</Button>
						<Button danger onClick={() => updateDislikes()}>
							Dislikes ({post.dislikes})
						</Button>
					</Col>
				</Row>
				<div>
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	function generateLinkPost() {
		return (
			<Card className="custom-menu-item" style={{ marginBottom: '20px', fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
				<Row>
					<Col span={24}>
						<Title level={3}>{post.title}</Title>
						<Text>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Text>{post.content}</Text>
						<iframe src={post.link} title="user shared embedded link" style={{ width: '100%', height: '300px', marginTop: '10px' }}></iframe>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Button type="primary" onClick={() => updateLikes()} style={{ marginRight: '10px' }}>
							Likes ({post.likes})
						</Button>
						<Button danger onClick={() => updateDislikes()}>
							Dislikes ({post.dislikes})
						</Button>
					</Col>
				</Row>
				<div>
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			</Card>
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

	const typeOfPost = post.type;
	console.log(typeOfPost);
	if (!post) return <div>No post to display</div>;
	if (typeOfPost === "blog") {
		console.log("blog post");
		generateBlogPost();
	} else if (typeOfPost === "code") {
		console.log("code post");
		generateCodePost();
	} else if (typeOfPost === "link") {
		console.log("link post");
		generateLinkPost();
	} else {
	return <div>Unknown post type</div>;
	}
};

export default Post;