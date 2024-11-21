import { colors } from "@/constants/colors";
import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { View, Text, StyleSheet } from 'react-native';


interface InfoContainerProps {
    header: ReactNode;
    content: ReactNode;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>
    contentStyle?: StyleProp<ViewStyle>
}


const InfoContainer: React.FC<InfoContainerProps> = ({
    header,
    content,
    style,
    contentStyle,
}) => {

    
    return (
        <View style={[styles.container, style]}>
            <View style={[styles.header, contentStyle]}>{header}</View>
            <View style={[styles.content, contentStyle]}>{content}</View>
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
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default InfoContainer;

