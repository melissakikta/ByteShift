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