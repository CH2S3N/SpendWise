import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

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
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexGrow: 1,
    borderRadius: 15,
  },

})