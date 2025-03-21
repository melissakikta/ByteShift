import React from 'react';
import type Post from '../interfaces/Post';

const PostDisplay: React.FC<Post> = () => {
    // placeholder data
    const title='hi';
    const content='hi';

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