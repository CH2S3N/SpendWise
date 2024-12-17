import { colors } from "@/constants/colors";
import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';

interface TextProps {
    content: ReactNode;
    style?: object;
}



const RegularText: React.FC<TextProps> = ({content}) => {
    return <Text style={styles.text}>{content}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.dark,
    }
})
export default RegularText;