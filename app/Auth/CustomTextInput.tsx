import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from './constants/theme';

interface CustomTextInputProps extends TextInputProps {
    label: string;
    error?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
                                                                    label,
                                                                    error,
                                                                    leftIcon,
                                                                    rightIcon,
                                                                    onRightIconPress,
                                                                    style,
                                                                    ...props
                                                                }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, error && styles.inputContainerError]}>
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={error ? COLORS.error : COLORS.gray}
                        style={styles.leftIcon}
                    />
                )}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={COLORS.gray}
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
                        <Ionicons
                            name={rightIcon}
                            size={20}
                            color={error ? COLORS.error : COLORS.gray}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    label: {
        ...TYPOGRAPHY.body,
        color: COLORS.dark,
        fontWeight: '500',
        marginBottom: SPACING.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: 15,
        paddingHorizontal: SPACING.md,
        minHeight: 50,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputContainerError: {
        borderColor: COLORS.error,
        backgroundColor: '#FFF5F5',
    },
    input: {
        flex: 1,
        ...TYPOGRAPHY.body,
        color: COLORS.dark,
        paddingVertical: SPACING.md,
    },
    leftIcon: {
        marginRight: SPACING.sm,
    },
    rightIcon: {
        marginLeft: SPACING.sm,
        padding: SPACING.xs,
    },
    errorText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.error,
        marginTop: SPACING.xs,
        marginLeft: SPACING.sm,
    },
});