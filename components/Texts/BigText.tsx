import { colors } from "@/constants/colors";
import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface TextProps {
    content: string;
    style?: StyleProp<TextStyle>;
}

const BigText: React.FC<TextProps> = ({content, style}) => {
    return <Text style={[styles.text, style]}>{content}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: colors.dark,
    }
})
export default BigText;