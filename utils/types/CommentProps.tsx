export interface CommentProps {
    id: number;
    text: string;
    author: string;
    authorId?: number;
    timestamp: Date;
    likes: number;
    replies?: CommentProps[];
}