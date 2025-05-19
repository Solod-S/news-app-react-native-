import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
