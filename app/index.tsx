import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Page = () => {
  const router = useRouter();

  // Shared values for fade-in
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  // Trigger animations on mount
  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
    subtitleOpacity.value = withTiming(1, { duration: 800, delay: 300 });
    buttonOpacity.value = withTiming(1, { duration: 800, delay: 600 });
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
        source={{
          uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        }}
        resizeMode="cover"
        style={styles.background}
      />
      <View style={styles.overlay}>
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          MEZHA
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, animatedSubtitleStyle]}>
          Discover the world of news
        </Animated.Text>

        <Animated.View style={animatedButtonStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.buttonText}>Start Reading</Text>
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
    fontSize: 48,
    color: "#ffffff",
    fontFamily: "RubikMonoOne",
    marginBottom: 16,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "#dddddd",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
