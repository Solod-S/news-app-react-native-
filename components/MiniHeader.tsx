import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelText: {
    fontSize: hp(2.4),
    color: Colors.darkGrey,
  },
  viewAllText: {
    fontSize: hp(1.8),
    color: "#4b5563",
  },
});
