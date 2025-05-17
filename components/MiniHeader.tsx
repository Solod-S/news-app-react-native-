import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Типы пропсов
interface MiniHeaderProps {
  label: string;
}

export function MiniHeader({ label }: MiniHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.labelText, { fontFamily: "SpaceGroteskBold" }]}>
        {label}
      </Text>
      {/* <Text style={[styles.viewAllText, { fontFamily: "SpaceGroteskMedium" }]}>
        View all
      </Text> */}
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelText: {
    fontSize: 20,
    color: Colors.darkGrey,
  },
  viewAllText: {
    fontSize: 16,
    color: "#4b5563",
  },
});
