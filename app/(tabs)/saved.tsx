import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface Article {
  author: string;
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export default function SavedScreen() {
  const router = useRouter();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  const handleClick = (item: Article) => {
    router.push({
      pathname: "/newsDetails",
      params: { ...item },
    });
  };

  const formatDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  };

  const toggleBookmarkAndSave = async (item: Article, index: number) => {
    try {
      const saved = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray: Article[] = saved ? JSON.parse(saved) : [];

      const isBookmarked = savedArticlesArray.some(
        savedArticle => savedArticle.url === item.url
      );

      if (!isBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        Toast.show({
          type: "success",
          position: "top",
          text1: "✅ Success",
          text2: "The article has been added successfully",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        refreshSavedArticles();
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          savedArticle => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        Toast.show({
          type: "info", // or "error" if you prefer
          position: "top",
          text1: "🗑️ Deleted",
          text2: "The article has been deleted",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        refreshSavedArticles();
      }
    } catch (error) {
      console.error("Error Saving/Removing Article", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "❌ Error",
        text2: "Something went wrong. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  const refreshSavedArticles = async () => {
    try {
      const saved = await AsyncStorage.getItem("savedArticles");
      const savedArray: Article[] = saved ? JSON.parse(saved) : [];
      setSavedArticles(savedArray);
    } catch (error) {
      console.error("Error refreshing saved articles", error);
    }
  };

  const handleClear = () => {
    Vibration.vibrate(200); // Vibrate for 100ms before showing the Alert
    Alert.alert(
      "Clear All?",
      "Are you sure you want to remove all saved articles?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "default",
          onPress: () => clearSavedArticles(),
        },
      ]
    );
  };

  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      Toast.show({
        type: "info", // or "error" if you prefer
        position: "top",
        text1: "🗑️ Deleted",
        text2: "The articles have been deleted",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      setSavedArticles([]);
    } catch (error) {
      console.error("Error clearing saved articles", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const saved = await AsyncStorage.getItem("savedArticles");
          const savedArray: Article[] = saved ? JSON.parse(saved) : [];
          setSavedArticles(savedArray);
        } catch (error) {
          console.error("Error loading saved articles", error);
        }
      };

      loadSavedArticles();
    }, [])
  );

  const renderItem = ({ item, index }: { item: Article; index: number }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleClick(item)}
    >
      <View style={styles.row}>
        <Image
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=500&q=60",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.title}>
            {item.title.length > 50
              ? item.title.slice(0, 50) + "..."
              : item.title}
          </Text>
          <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => toggleBookmarkAndSave(item, index)}
        >
          <BookmarkSquareIcon color={Colors.secondColor} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Articles</Text>
        <TouchableOpacity
          disabled={savedArticles?.length <= 0}
          onPress={handleClear}
          style={[
            styles.clearButton,
            { opacity: savedArticles?.length <= 0 ? 0.2 : 1 },
          ]}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {savedArticles?.length <= 0 && (
        <View style={styles.centeredContainer}>
          <Text style={styles.centeredText}>There is no news</Text>
        </View>
      )}
      <FlatList
        data={savedArticles}
        keyExtractor={item => item.title}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(2) }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wp(100),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    fontSize: hp(1.8),
    color: "gray",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: Colors.black,
  },
  clearButton: {
    backgroundColor: Colors.secondColor,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: hp(1.8),
    fontWeight: "bold",
  },
  itemContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: hp(9),
    height: hp(10),
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingLeft: 16,
  },
  author: {
    fontSize: hp(1.4),
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: hp(1.7),
    color: "#111",
    fontWeight: "600",
  },
  date: {
    fontSize: hp(1.4),
    color: "#666",
  },
  icon: {
    paddingLeft: 8,
  },
});
