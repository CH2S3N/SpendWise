import { colors } from "@/constants/colors";
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface InfoContainerProps {
    title: ReactNode;
    content: ReactNode;
    style?: object;
}


const InfoContainer: React.FC<InfoContainerProps> = ({title, content, style}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.content}>{content}</View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        flex: 1,
        flexGrow: 1,
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowRadius: 8,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
        padding: 10,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    content: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default InfoContainer;

