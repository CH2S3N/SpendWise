import { colors } from "@/constants/colors";
import { Modal as RNModal, ModalProps, View, ViewStyle, StyleSheet } from "react-native";

type PROPS = ModalProps & {
    isOpen: boolean,
    style?: ViewStyle,
}


export const Modal = ({ isOpen, children, style, ...rest}: PROPS) => {
    const content = (
        <View style={[styles.container, style]} >
            {children}
        </View>
    )
    return (
        <RNModal
        visible={isOpen}
        animationType="slide"
        {...rest}
        >
            {content}
        </RNModal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    }
})