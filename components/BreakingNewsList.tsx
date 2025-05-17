import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import Carousal from "react-native-snap-carousel";
import { BreakingNewsCard } from "./BreakingNewsCard";
const { width } = Dimensions.get("window");

// Типы
interface NewsItem {
  title: string;
  author?: string;
  urlToImage?: string;
}

interface BreakingNewsProps {
  data: NewsItem[];
  label: string;
}

export function BreakingNewsList({ data, label }: BreakingNewsProps) {
  const router = useRouter();

  const handleClick = (item: NewsItem) => {
    router.push({
      pathname: "/newsDetails",
      params: { ...item },
    });
  };

  return (
    <View>
      <Carousal
        data={data}
        renderItem={({ item }: { item: unknown }) => (
          <BreakingNewsCard item={item as NewsItem} handleClick={handleClick} />
        )}
        firstItem={0}
        autoplay={true}
        sliderWidth={width}
        itemWidth={width}
        vertical={false}
        autoplayInterval={4000}
      />
    </View>
  );
}
