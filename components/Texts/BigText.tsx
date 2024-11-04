import { colors } from "@/constants/colors";
import React from 'react';
import { Text, StyleSheet } from 'react-native';


const BigText: React.FC<{content: string}> = ({content}) => {
    return <Text style={styles.text}>{content}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: colors.black,
    }
})
export default BigText;