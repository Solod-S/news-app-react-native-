import { Ionicons } from "@expo/vector-icons";

export const icon = {
  index: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="home" size={24} color={color} />
    ) : (
      <Ionicons name="home-outline" size={24} color={color} />
    ),
  discover: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="compass" size={25} color={color} />
    ) : (
      <Ionicons name="compass-outline" size={25} color={color} />
    ),
  saved: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="bookmarks" size={22} color={color} />
    ) : (
      <Ionicons name="bookmarks-outline" size={22} color={color} />
    ),
  settings: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="information-circle" size={24} color={color} />
    ) : (
      <Ionicons name="information-circle-outline" size={24} color={color} />
    ),
};
