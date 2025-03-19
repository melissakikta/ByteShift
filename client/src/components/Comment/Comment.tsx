import React from "react";
import type CommentProps from "../../interfaces/Comment";

const Comment = ({ comment }: { comment: CommentProps }): JSX.Element => {
    return (
        <>
            <div>{comment.username}</div>
            <div>{comment.content}</div>
        </>
    );
};

export default Comment;