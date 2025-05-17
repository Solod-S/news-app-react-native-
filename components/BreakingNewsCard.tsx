import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Типы пропсов
interface NewsItem {
  title: string;
  author?: string;
  urlToImage?: string;
}

interface BreakingNewsCardProps {
  item: NewsItem;
  handleClick: (item: NewsItem) => void;
}

export function BreakingNewsCard({ item, handleClick }: BreakingNewsCardProps) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={styles.container}>
        <Image
          source={{
            uri:
              item?.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title and Author */}
        <View style={styles.textContainer}>
          <View style={styles.titleAuthorWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>
                {item?.title.length > 60
                  ? item?.title.slice(0, 58) + "..."
                  : item?.title.split("-")[0] || "N/A"}
              </Text>
            </View>

            <Text style={styles.authorText}>
              {item?.author?.length && item?.author.length > 20
                ? item?.author.slice(0, 20) + "..."
                : item?.author || ""}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    width: width - 32,
    position: "relative",
  },
  image: {
    width: width - 32,
    height: height * 0.22,
    borderRadius: 24,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: width - 32,
    height: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    justifyContent: "flex-end",
    height: "80%",
  },
  titleAuthorWrapper: {
    gap: 4,
  },
  titleWrapper: {
    maxWidth: "98%",
  },
  titleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  authorText: {
    color: "#d4d4d4",
    fontSize: 14,
    fontWeight: "500",
  },
});
