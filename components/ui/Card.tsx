
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
  return (
    <View style={styles.card}>

      {children}
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
  }
})