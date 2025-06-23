import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Comment } from '@/utils/types/CarProps';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CommentsModalProps {
    isVisible: boolean;
    onClose: () => void;
    vehicleId: number;
    comments: Comment[];
    onAddComment: (comment: string) => void;
    currentUserId: number;
    vehicleName: string;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
                                                         isVisible,
                                                         onClose,
                                                         vehicleId,
                                                         comments,
                                                         onAddComment,
                                                         currentUserId,
                                                         vehicleName,
                                                     }) => {
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 100,
                friction: 8,
            }).start();
        } else {
            Animated.spring(slideAnim, {
                toValue: SCREEN_HEIGHT,
                useNativeDriver: true,
                tension: 100,
                friction: 8,
            }).start();
        }
    }, [isVisible]);

    const handleSubmitComment = async () => {
        if (newComment.trim() === '') return;

        setIsLoading(true);
        try {
            await onAddComment(newComment.trim());
            setNewComment('');
            inputRef.current?.blur();
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (date: Date | string | number) => {
        const dateObj = new Date(date); // Convertir en Date
        const now = new Date();
        const diff = now.getTime() - dateObj.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'À l\'instant';
        if (minutes < 60) return `${minutes}min`;
        if (hours < 24) return `${hours}h`;
        return `${days}j`;
    };

    const renderComment = (comment: Comment) => (
        <View key={comment.id} style={styles.commentItem}>
            <View style={styles.commentHeader}>
                <Image
                    source={{
                        uri: comment.userAvatar || 'https://via.placeholder.com/40x40?text=U'
                    }}
                    style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                    <View style={styles.commentBubble}>
                        <Text style={styles.commentUserName}>{comment.userName}</Text>
                        <Text style={styles.commentText}>{comment.comment}</Text>
                    </View>
                    <Text style={styles.commentTime}>{formatDate(comment.createdAt)}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{ translateY: slideAnim }],
                        }
                    ]}
                >
                    <SafeAreaView style={styles.safeArea}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.dragIndicator} />
                            <Text style={styles.headerTitle}>
                                Commentaires - {vehicleName}
                            </Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={onClose}
                            >
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* Comments List */}
                        <ScrollView
                            style={styles.commentsList}
                            showsVerticalScrollIndicator={false}
                        >
                            {comments.length === 0 ? (
                                <View style={styles.emptyState}>
                                    <MaterialIcons name="comment" size={50} color="#ccc" />
                                    <Text style={styles.emptyStateText}>
                                        Aucun commentaire pour le moment
                                    </Text>
                                    <Text style={styles.emptyStateSubtext}>
                                        Soyez le premier à commenter !
                                    </Text>
                                </View>
                            ) : (
                                comments.map(renderComment)
                            )}
                        </ScrollView>

                        {/* Input Section */}
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.inputContainer}
                        >
                            <View style={styles.inputRow}>
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/40x40?text=M' }}
                                    style={styles.currentUserAvatar}
                                />
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        ref={inputRef}
                                        style={styles.textInput}
                                        placeholder="Ajouter un commentaire..."
                                        placeholderTextColor="#999"
                                        value={newComment}
                                        onChangeText={setNewComment}
                                        multiline
                                        maxLength={500}
                                    />
                                    <TouchableOpacity
                                        style={[
                                            styles.sendButton,
                                            {
                                                opacity: newComment.trim() ? 1 : 0.5,
                                                backgroundColor: newComment.trim() ? '#007AFF' : '#ccc'
                                            }
                                        ]}
                                        onPress={handleSubmitComment}
                                        disabled={!newComment.trim() || isLoading}
                                    >
                                        {isLoading ? (
                                            <MaterialIcons name="hourglass-empty" size={20} color="white" />
                                        ) : (
                                            <Ionicons name="send" size={20} color="white" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backdrop: {
        flex: 1,
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT * 0.8,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dragIndicator: {
        position: 'absolute',
        top: 8,
        left: '50%',
        marginLeft: -20,
        width: 40,
        height: 4,
        backgroundColor: '#ccc',
        borderRadius: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        marginTop: 10,
    },
    closeButton: {
        padding: 5,
    },
    commentsList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 15,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    commentItem: {
        marginVertical: 8,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentBubble: {
        backgroundColor: '#f5f5f5',
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxWidth: '90%',
    },
    commentUserName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    commentTime: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
        marginLeft: 16,
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    currentUserAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 100,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        maxHeight: 80,
        textAlignVertical: 'top',
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
});

export default CommentsModal;