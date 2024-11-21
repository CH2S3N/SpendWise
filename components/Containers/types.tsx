import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ContainerProps{
    children?: ReactNode;
    title?: ReactNode;
    content: ReactNode;
    style?: object;
}