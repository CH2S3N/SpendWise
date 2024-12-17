import { colors } from "@/constants/colors";
import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';


const SmallText: React.FC<{content: string}> = ({content}) => {
    return <Text style={styles.text}>{content}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: colors.dark,
    }
})
export default SmallText;