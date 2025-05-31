import {CommentProps} from "@/utils/types/CommentProps";


export interface BaseEntityProps {
    // Propriétés d'interaction
    likes?: number;
    comments?: CommentProps[];
    shares?: number;
    favorite?: boolean;
    bookmarked?: boolean;

    // Méthodes de callback
    onLike?: (id: number, isLiked: boolean) => void;
    onComment?: (id: number, comment: CommentProps) => void;
    onShare?: (id: number) => void;
    onBookmark?: (id: number, isBookmarked: boolean) => void;
}