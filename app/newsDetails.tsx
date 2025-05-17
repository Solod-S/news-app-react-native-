import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { WebView } from "react-native-webview";

const { height, width } = Dimensions.get("window");

interface Article {
  url: string;
  [key: string]: any;
}

export default function NewsDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = params as Article;

  const [visible, setVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmarkAndSave = async () => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray: Article[] = savedArticles
        ? JSON.parse(savedArticles)
        : [];

      const isAlreadyBookmarked = savedArticlesArray.some(
        a => a.url === item.url
      );

      if (!isAlreadyBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        setIsBookmarked(true);
      } else {
        const updated = savedArticlesArray.filter(a => a.url !== item.url);
        await AsyncStorage.setItem("savedArticles", JSON.stringify(updated));
        setIsBookmarked(false);
      }
    } catch (err) {
      console.error("Error Saving Article", err);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: item.url,
      });
    } catch (error) {
      console.error("Error sharing article", error);
    }
  };

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const saved = await AsyncStorage.getItem("savedArticles");
        const savedArray: Article[] = saved ? JSON.parse(saved) : [];
        const bookmarked = savedArray.some(a => a.url === item.url);
        setIsBookmarked(bookmarked);
      } catch (err) {
        console.error("Error Loading Saved Articles", err);
      }
    };

    loadSavedArticles();
  }, [item.url]);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.actionsWrapper}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleShare()}
          >
            <ShareIcon size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={toggleBookmarkAndSave}
          >
            <BookmarkSquareIcon
              size={25}
              color={isBookmarked ? "green" : "gray"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </View>
      <WebView
        source={{ uri: item.url }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible && (
        <ActivityIndicator
          size="large"
          color={Colors.tint}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
