import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

interface AnimationConfig {
    fadeEnabled?: boolean;
    slideEnabled?: boolean;
    fadeDuration?: number;
    slideDuration?: number;
    slideDistance?: number;
}

export default function usePageAnimation(config: AnimationConfig = {}) {
    const {
        fadeEnabled = true,
        slideEnabled = true,
        fadeDuration = 800,
        slideDuration = 600,
        slideDistance = 30
    } = config;

    const fadeAnim = useRef(new Animated.Value(fadeEnabled ? 0 : 1)).current;
    const slideAnim = useRef(new Animated.Value(slideEnabled ? slideDistance : 0)).current;

    const startAnimation = () => {
        const animations = [];

        if (fadeEnabled) {
            animations.push(
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: fadeDuration,
                    useNativeDriver: true,
                })
            );
        }

        if (slideEnabled) {
            animations.push(
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: slideDuration,
                    useNativeDriver: true,
                })
            );
        }

        if (animations.length > 0) {
            Animated.parallel(animations).start();
        }
    };

    useEffect(() => {
        startAnimation();
    }, []);

    const getAnimatedStyle = () => ({
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
    });

    return {
        fadeAnim,
        slideAnim,
        getAnimatedStyle,
        startAnimation,
    };
}