import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const Page = () => {
  const router = useRouter();

  // Shared values for fade-in
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  // Trigger animations on mount
  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
    setTimeout(() => {
      subtitleOpacity.value = withTiming(1, { duration: 800 });
    }, 300);
    setTimeout(() => {
      buttonOpacity.value = withTiming(1, { duration: 800 });
    }, 600);
  }, []);

  // Animated styles
  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));
  const animatedSubtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));
  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Image
        source={require("./../assets/images/start.jpg")}
        resizeMode="cover"
        style={styles.background}
      />
      <View style={styles.overlay}>
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          MEZHA
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, animatedSubtitleStyle]}>
          Discover the latest news
        </Animated.Text>

        <Animated.View style={animatedButtonStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: hp(5.2),
    color: "#ffffff",
    fontFamily: "RubikMonoOne",
    // marginBottom: 16,
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: hp(2),
    color: "#dddddd",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(3),
    fontWeight: "600",
  },
});
