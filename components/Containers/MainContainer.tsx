import { colors } from "@/constants/colors";
import React, { FunctionComponent } from "react";
import styled from 'styled-components/native';
import { ContainerProps } from "./type";


const { accent} = colors;

const StyledView = styled.View`
    flex: 1;
    background-color: ${accent};
    justify-content: center;
   
`

const MainContainer: FunctionComponent<ContainerProps> = (props) => {
    return <StyledView style={props.style}>{props.children}</StyledView>
};

export default MainContainer;