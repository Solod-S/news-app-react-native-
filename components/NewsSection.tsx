import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface NewsItem {
  url: string;
  urlToImage?: string;
  author?: string;
  title: string;
  publishedAt: string;
}

interface Props {
  newsProps: NewsItem[];
  label: string;
}

export function NewsSection({ newsProps }: Props) {
  const router = useRouter();
  const [urlList, setUrlList] = useState<string[]>([]);
  const [bookmarkStatus, setBookmarkStatus] = useState<boolean[]>([]);

  const formatDate = (isoDate: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const urls = newsProps.map(item => item.url);
    setUrlList(urls);
  }, [newsProps]);

  const handleClick = (item: NewsItem) => {
    router.push({
      pathname: "/newsDetails",
      params: { ...item },
    });
  };

  const toggleBookmarkAndSave = async (item: NewsItem, index: number) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray: NewsItem[] = savedArticles
        ? JSON.parse(savedArticles)
        : [];

      const isBookmarked = savedArticlesArray.some(
        savedArticle => savedArticle.url === item.url
      );

      if (!isBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          savedArticle => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray: NewsItem[] = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          const isArticleBookmarkedList = urlList.map(url =>
            savedArticlesArray.some(savedArticle => savedArticle.url === url)
          );

          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log("Error Loading Saved Articles", error);
        }
      };

      loadSavedArticles();
    }, [urlList])
  );

  const renderItem: ListRenderItem<NewsItem> = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleClick(item)}
    >
      <View style={styles.itemContent}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item.urlToImage ||
                "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=500&q=60",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Text */}
        <View style={styles.textContent}>
          <Text style={styles.authorText}>
            {(item.author ?? "").length > 20
              ? (item.author ?? "").slice(0, 20) + "..."
              : item.author ?? ""}
          </Text>

          <Text
            style={[
              styles.titleText,
              { fontFamily: "SpaceGroteskBold", fontSize: hp(1.7) },
            ]}
          >
            {item.title.length > 50
              ? item.title.slice(0, 50) + "..."
              : item.title}
          </Text>

          <Text style={styles.dateText}>{formatDate(item.publishedAt)}</Text>
        </View>

        {/* Bookmark */}
        <View style={styles.bookmarkContainer}>
          <TouchableOpacity onPress={() => toggleBookmarkAndSave(item, index)}>
            <BookmarkSquareIcon
              color={bookmarkStatus[index] ? "#47008C" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={newsProps}
        scrollEnabled={false}
        keyExtractor={item => item.url}
        renderItem={renderItem}
        nestedScrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  itemContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    width: "20%",
  },
  image: {
    width: hp(9),
    height: hp(10),
    borderRadius: 8,
  },
  textContent: {
    width: "70%",
    paddingLeft: 12,
    justifyContent: "center",
  },
  authorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
  },
  titleText: {
    color: "#111827",
    textTransform: "capitalize",
    maxWidth: "90%",
  },
  dateText: {
    fontSize: 12,
    color: "#4b5563",
  },
  bookmarkContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
