import Comment from './Comment';

// todo check on switching comments to id or if makes more sense to keep as Comment[]
export default interface Post {
    _id: string;
    username: string;
    type: string;
    title: string;
    content: string;
    link: string;
    imgURL: string;
    likes: number;
    dislikes: number;
    comments: Comment[];
    createdAt: string;
}