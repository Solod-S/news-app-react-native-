import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const Page = (props: Props) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
