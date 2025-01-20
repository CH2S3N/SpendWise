
import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface Props extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: Props) {
  return (
    <View style={styles.card}>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background
  }
})