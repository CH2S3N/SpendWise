import { colors } from "@/constants/colors";
import React, { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components/native';
import SmallText from "../Texts/SmallText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TextInput } from "react-native";



    type IconName = keyof typeof MaterialCommunityIcons.glyphMap; 
    
interface InputProps {
    icon: IconName;
    style?: object;
    content: string;
}

const StyledTextInput: FunctionComponent<InputProps> = ({icon, content, style, ...props}) => {
    return (
        <View style={[styles.InputWrapper, style]}>
            <View style={[styles.LeftIcon]}>
                <MaterialCommunityIcons name={icon} size={30} color={colors.gray}  />          </View>
            <SmallText content={content} />
            <TextInput style={[styles.InputField]} {...props}/>
        </View>
    )
};


const styles = StyleSheet.create({
    InputWrapper: {
        width: '100%',
        position: 'relative',
    },
    LeftIcon: {
        position: 'absolute',
        top: 30,
        left: 15,
        zIndex: 1,
        borderRightWidth: 2,
        borderColor: colors.gray,
        paddingRight: 10,
    },
    InputField: {
        backgroundColor: colors.dark,
        height: 60,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.gray,
        marginVertical: 3,
        marginBottom: 10,
        paddingLeft:15,
        paddingRight: 15,
        fontSize: 16,
        color: colors.dark,
    }
})


export default StyledTextInput;