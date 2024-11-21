
import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps{
  content: ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({style,content})=>{
  return (
    <View style={[styles.card, style]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    flex: 1
  }
})


export default Card;