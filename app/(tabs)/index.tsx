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
import { ScrollView, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";

const Page = () => {
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

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          <View
            style={{
              height: hp(20),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </View>
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
      <ScrollView>
        {isRecommendedLoading ? (
          <View
            style={{
              height: hp(40),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </View>
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
