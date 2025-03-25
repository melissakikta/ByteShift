import React, { useState, useEffect } from 'react';
import type PostType from '../../interfaces/Post';
import type CommentProps from '../../interfaces/Comment';
import CommentForm from '../Comment/CommentForm';

import Comment from '../Comment/Comment';
import AuthService from '../../utils/auth';

import { useMutation, useQuery } from '@apollo/client';
import { Button, Typography, Card, Row, Col } from 'antd';

import { QUERY_GET_COMMENTS_FOR_POST } from '../../utils/queries';
import { LIKE_POST, DISLIKE_POST, ADD_TO_LIKED_POSTS, ADD_TO_DISLIKED_POSTS } from '../../utils/mutations';

const { Title, Text } = Typography;

interface PostProps {
	post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
	// query for comments, likes, and dislikes and store in state
	// array of comments, query for 3 most recent comments
	const [comments, setComments] = useState<CommentProps[]>([]);

	// todo add mutation and tracking for likes and dislikes onClick
	const [likes, setLikes] = useState<number>(post.likes || 0);
	const [dislikes, setDislikes] = useState<number>(post.dislikes || 0);

	function loggedUser() {
		// return user from local storage
		const user = AuthService.getProfile();
		return user.data.id;
	}

	//useMutation hooks
	const [addLike] = useMutation(LIKE_POST);
	const [addToLikedPosts] = useMutation(ADD_TO_LIKED_POSTS);
	const [addDislike] = useMutation(DISLIKE_POST);
	const [addToDislikedPosts] = useMutation(ADD_TO_DISLIKED_POSTS);

	// todo finish building like and dislike workflow in app (update state for user, send mutation to server)
	//function to update likes count
	async function updateLikes() {
		setLikes((prevLikes) => prevLikes + 1);
		try{
			await addLike({variables: { postId: post._id }});
			await addToLikedPosts({variables: { postId: post._id, userId: loggedUser() } });
		} catch (error) {
			console.error("Error updating likes:", error);
			setLikes((prevLikes) => prevLikes - 1);
		}
	}

	//function to update dislikes count
	async function updateDislikes() {
		setDislikes((prevDislikes) => prevDislikes + 1);
		try{
			await addDislike({variables: { postId: post._id }});
			await addToDislikedPosts({variables: { postId: post._id, userId: loggedUser() } });
		} catch (error) {
			console.error("Error updating dislikes:", error);
			setDislikes((prevDislikes) => prevDislikes - 1);
		}
	}
	
	//fetch comments
	const { data } = useQuery(QUERY_GET_COMMENTS_FOR_POST, {
		variables: { postId: post._id },
		skip: post.title === "test title",
	});

	useEffect(() => {
		if (data && data.getCommentsForPost) {
			setComments(
				data.getCommentsForPost.map((comments: CommentProps) => ({
					_id: comments._id,
					username: comments.username,
					content: comments.content,
					createdAt: comments.createdAt
				}))
			);
		}
	});

	function generateBlogPost() {
		console.log(post);
		return (
			<Card className="custom-menu-item" style={{ marginBottom: '20px', fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
				<Row>
					<Col span={24}>
						<Title level={3} style={{ fontFamily: 'var(--font-body)', fontSize: '2rem'}}>{post.title}</Title>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem'}}>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem'}}>{post.content}</Text>
						{post.imgURL && <img src={post.imgURL} alt="Post Image" style={{ width: '100%', marginTop: '10px' }} />}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
					<Button type="primary" onClick={() => updateLikes()} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Likes ({likes})
						</Button>
						<Button type="primary" onClick={updateDislikes} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Dislikes ({dislikes})
						</Button>
					</Col>
				</Row>

				<CommentForm postId={post._id} />

				<div>
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	function generateCodePost() {
		console.log(post);
		return (
			<Card className="custom-menu-item" style={{ marginBottom: '20px', fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
				<Row>
					<Col span={24}>
						<Title level={3} style={{ fontFamily: 'var(--font-body)', fontSize: '2rem'}}>{post.title}</Title>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem'}}>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<code style={{fontSize: '1rem', background: 'var(--code)', color: 'white', padding: '6px', fontFamily: 'monaco'}}>{post.content}</code>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
					<Button type="primary" onClick={() => updateLikes()} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Likes ({likes})
						</Button>
						<Button type="primary" onClick={updateDislikes} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Dislikes ({dislikes})
						</Button>
					</Col>
				</Row>

				<CommentForm postId={post._id} />

				<div>
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	function generateLinkPost() {
		console.log(post);
		return (
			<Card className="custom-menu-item" style={{ marginBottom: '20px', fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
				<Row>
					<Col span={24}>
						<Title level={3} style={{ fontFamily: 'var(--font-body)', fontSize: '2rem'}}>{post.title} </Title>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem'}}>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem'}}>{post.content}</Text>
						<iframe src={post.link} title="user shared embedded link" style={{ width: '100%', height: '300px', marginTop: '10px' }}></iframe>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Button type="primary" onClick={() => updateLikes()} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Likes ({likes})
						</Button>
						<Button type="primary" onClick={updateDislikes} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Dislikes ({dislikes})
						</Button>
					</Col>
				</Row>

				<CommentForm postId={post._id} />

				<div>
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	// default post for testing has no working ID to query for comments
	if (post.title !== "test title") {
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
	}

	const typeOfPost = post.type;
	console.log(typeOfPost);
	if (!post) return <div>No post to display</div>;
	if (typeOfPost === "blog") {
		console.log("blog post");
		return generateBlogPost();
	} else if (typeOfPost === "code") {
		console.log("code post");
		return generateCodePost();
	} else if (typeOfPost === "link") {
		console.log("link post");
		return generateLinkPost();
	} else {
		return <div>Unknown post type</div>;
	}
};

export default Post;