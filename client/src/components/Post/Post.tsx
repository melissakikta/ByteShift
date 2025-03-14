import type Post from '../../interfaces/Post';

const Post = ({ post }: { post: Post }): JSX.Element => {
	return <div>{post}</div>;
};