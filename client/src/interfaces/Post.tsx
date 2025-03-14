export default interface Post {
    _id: string;
    username: string;
    type: string;
    title: string;
    content: string;
    imgURL: string;
    likes: number;
    dislikes: number;
    comments: Comment[];
    createdAt: string;
}