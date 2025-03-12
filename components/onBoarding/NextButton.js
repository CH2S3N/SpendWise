import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import { AntDesign } from '@expo/vector-icons';

const NextButton = ({ percentage, scrollTo }) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true, 
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener(({ value }) => {
            const strokeDashoffset = circumference - (circumference * value) / 100;
            if (progressRef.current) {
                progressRef.current.setNativeProps({ strokeDashoffset });
            }
        });
        return () => {
            progressAnimation.removeAllListeners();
        };
    }, [percentage]);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={center}>
                    <Circle
                        stroke={colors.light}
                        fill="none"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <Circle
                        ref={progressRef}
                        stroke={colors.green}
                        fill="none"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                    />
                </G>
            </Svg>
            <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.6} 
                onPress={scrollTo}
            >
                <AntDesign name={'arrowright'} size={32} color={colors.light} />
            </TouchableOpacity>
        </View>
    );
};

export default NextButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        backgroundColor: colors.green,
        borderRadius: 100,
        padding: 20,
    },
});
