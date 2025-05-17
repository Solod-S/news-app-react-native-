import {
  BreakingNewsList,
  Header,
  Loading,
  MiniHeader,
  NewsSection,
} from "@/components";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";

type Props = {};

const Page = (props: Props) => {
  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });

  // Recommended News
  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommededNews"],
    queryFn: fetchRecommendedNews,
  });

  // console.log(`data.articles`, data.articles.length);
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          // <Loading />
          <Text>Loading</Text>
        ) : (
          <View>
            <MiniHeader label="Breaking News" />
            <BreakingNewsList label="Breaking News" data={data.articles} />
          </View>
        )}
      </View>
      {/* Recommended News */}
      <View style={{ paddingHorizontal: 16 }}>
        <MiniHeader label="Recommended" />
      </View>
      <ScrollView
        contentContainerStyle={
          {
            // paddingBottom: hp(80),
          }
        }
      >
        {isRecommendedLoading ? (
          <Loading />
        ) : (
          <NewsSection
            label="Recommendation"
            newsProps={recommendedNew.articles}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,

    paddingTop: 10,
    paddingBottom: 10,
  },
});
