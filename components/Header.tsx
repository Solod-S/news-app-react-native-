import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export function Header() {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "RubikMonoOne",
            fontSize: hp(2.7),
            color: Colors.black,
            letterSpacing: -2,
          }}
        >
          MEZHA
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 9999,
          gap: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/searchScreen")}
          style={{
            backgroundColor: "#e5e7eb",
            borderRadius: 9999,
            padding: 8,
          }}
        >
          <MagnifyingGlassIcon size={25} strokeWidth={3} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
