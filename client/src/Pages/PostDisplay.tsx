import React from 'react';

interface PostDisplayProps {
    title: string;
    content: string;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ title, content }) => {
    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default PostDisplay;

//use state of posts update posts 
// array of the post objects
//when loading the page, it will use the mutation
//use the function of Post from Post/Post.tsx