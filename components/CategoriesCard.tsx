import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface Category {
  title: string;
}

interface CategoriesCardProps {
  categories: Category[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}

export function CategoriesCard({
  categories,
  activeCategory,
  handleChangeCategory,
}: CategoriesCardProps) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollViewContent]}
      >
        {categories.map((category, index) => {
          const isActive = category.title === activeCategory;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.title)}
              style={styles.itemWrapper}
            >
              <View
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: isActive
                      ? Colors.secondColor
                      : "rgba(0,0,0,0.1)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isActive ? "#ffffff" : "#4B5563",
                    },
                  ]}
                >
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingRight: 20,
    flexDirection: "row",
    gap: 5,
  },
  itemWrapper: {
    alignItems: "center",
    marginRight: 8,
  },
  categoryItem: {
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoryText: {
    textTransform: "capitalize",
    fontSize: hp(1.6),
  },
});
