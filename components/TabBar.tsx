import TabBarButton from "@/components/TabBarButton";
import { Colors } from "@/constants/Colors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, Platform, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;
  const indicatorWidth = 40;

  const tabPositionX = useSharedValue(0); // инициализация на 0

  // ⏬ Когда layout обновится, обновим позицию индикатора
  useEffect(() => {
    if (dimensions.width > 0) {
      tabPositionX.value = withTiming(
        buttonWidth * state.index + buttonWidth / 2 - indicatorWidth / 2,
        { duration: 0 } // без анимации при первом рендере
      );
    }
  }, [dimensions.width, state.index]);

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View style={{ backgroundColor: "white" }}>
      <View onLayout={onTabbarLayout} style={styles.tabbar}>
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              backgroundColor: Colors.tint,
              top: 52,
              left: 0,
              height: 8,
              width: indicatorWidth,
              borderRadius: 4,
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          let label: string;
          if (typeof options.tabBarLabel === "string") {
            label = options.tabBarLabel;
          } else if (typeof options.title === "string") {
            label = options.title;
          } else {
            label = route.name;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            tabPositionX.value = withTiming(
              buttonWidth * index + buttonWidth / 2 - indicatorWidth / 2,
              { duration: 200 }
            );

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              label={label}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    borderWidth: 0.7,
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 0,
    backgroundColor: Colors.white,
  },
});
