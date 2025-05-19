import { useQuery } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CategoriesCard,
  Header,
  Loading,
  MiniHeader,
  NewsSection,
} from "@/components";
import newsCategoryList from "@/constants/Categories";
import { Colors } from "@/constants/Colors";
import { fetchDiscoverNews } from "../../utils/NewsApi";

interface NewsItem {
  url: string;
  urlToImage?: string;
  author?: string;
  title: string;
  publishedAt: string;
}

export default function DiscoverScreen() {
  const [activeCategory, setActiveCategory] = useState("business");
  const [withoutRemoved, setWithoutRemoved] = useState<NewsItem[]>([]);

  const { data: discoverNew, isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);

    const filteredArticles = discoverNew?.articles.filter(
      (article: NewsItem) => article.title !== "[Removed]"
    );

    setWithoutRemoved(filteredArticles || []);
  };

  useEffect(() => {
    if (discoverNew?.articles) {
      const filtered = discoverNew.articles.filter(
        (article: NewsItem) => article.title !== "[Removed]"
      );
      setWithoutRemoved(filtered || []);
    }
  }, [discoverNew]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header />

        {/* Categories */}
        <View style={[styles.categoryWrapper, { marginTop: 15 }]}>
          <CategoriesCard
            categories={newsCategoryList}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View style={styles.sectionHeader}>
          <MiniHeader label="Discover" />
        </View>
      </View>
      {/* News */}
      <View style={styles.newsSection}>
        {isDiscoverLoading ? (
          <View style={styles.loadingWrapper}>
            <Loading />
          </View>
        ) : (
          <ScrollView>
            <NewsSection newsProps={withoutRemoved} label="Discovery" />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerWrapper: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    color: "#065F46",
    fontFamily: "SpaceGroteskBold",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#4B5563",
    fontFamily: "SpaceGroteskMedium",
  },

  categoryWrapper: {
    flexDirection: "row",
  },
  newsSection: {
    flex: 1,
  },
  sectionHeader: {},

  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
