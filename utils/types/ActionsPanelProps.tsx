import {BaseEntityProps} from "@/utils/types/BaseEntityProps";
import {CommentProps} from "@/utils/types/CommentProps";

export interface ActionsPanelProps {
    entity: BaseEntityProps;
    entityType?: 'vehicle' | 'agency' | 'driver';
    onLike?: (id: number, isLiked: boolean) => void;
    onComment?: (id: number, comment: CommentProps) => void;
    onShare?: (id: number) => void;
    onBookmark?: (id: number, isBookmarked: boolean) => void;
    style?: any;
    position?: 'right' | 'bottom' | 'left';
    showLike?: boolean;
    showComment?: boolean;
    showShare?: boolean;
    showBookmark?: boolean;
    showHeartAnimation?: boolean;
}