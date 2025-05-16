import { debounce } from "lodash";
import { useCallback, useState } from "react";
import type { JSX } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fetchSearchNews } from "../utils/NewsApi";
// import NewsSection from "../components/NewsSection/NewsSection";
import { useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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

        setLoading(false);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
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
          <XMarkIcon size={25} color="green" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontFamily: "SpaceGroteskBold",
          }}
        >
          {results?.length} News for {searchTerm}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        {/* <NewsSection newsProps={results} label="Search Results" /> */}
      </ScrollView>
    </View>
  );
}
