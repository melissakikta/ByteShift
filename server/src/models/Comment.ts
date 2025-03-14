import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
    username: string;
    content: string;
    createdAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;