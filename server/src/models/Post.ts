import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
    username: string;
    type: string;
    title: string;
    content: string;
    link?: string;
    imgURL?: string;
    likes: number;
    dislikes: number;
    comments: Schema.Types.ObjectId[];
    createdAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        username: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        }, 
        imgURL: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0,
        },
        dislikes: {
            type: Number,
            default: 0,
        },
        comments: [ {type: Schema.Types.ObjectId, ref: "Comment"} ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Post = model<IPost>('Post', postSchema);

export default Post;