import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { debounce } from "lodash";
import type { JSX } from "react";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NewsSection } from "../components";
import { fetchSearchNews } from "../utils/NewsApi";
const { height, width } = Dimensions.get("window");

interface Article {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt?: string;
  [key: string]: any;
}

export default function SearchScreen(): JSX.Element {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (search: string) => {
    if (search && search.length > 2) {
      setLoading(true);
      setResults([]);
      setSearchTerm(search);

      try {
        const data = await fetchSearchNews(search);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Search Input */}

      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 12,
          marginTop: 48,
          flexDirection: "row",
          padding: 8,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f3f3f3",
          borderRadius: 8,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your news"
          placeholderTextColor={"gray"}
          style={{
            fontWeight: "500",
            color: "black",
            letterSpacing: 0.5,
            padding: 12,
            paddingVertical: 4,
            width: "90%",
          }}
        />
        <TouchableOpacity onPress={() => router.back()}>
          <XMarkIcon size={25} color={Colors.darkGrey} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
        <Text
          style={{
            fontSize: hp(1.6),
            color: "black",
            fontFamily: "SpaceGroteskBold",
            opacity: 0.6,
          }}
        >
          {results?.length} News for: {searchTerm}
        </Text>
      </View>

      {loading && (
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

      {!loading && results?.length <= 0 && (
        <View style={styles.centeredContainer}>
          <Text style={styles.centeredText}>There is no news</Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        <NewsSection
          newsProps={results.map(article => ({
            ...article,
            publishedAt: article.publishedAt ?? "",
          }))}
          label="Search Results"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    fontSize: hp(1.8),
    color: "gray",
  },
});
