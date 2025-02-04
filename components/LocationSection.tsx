import moment from "moment";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { BookmarkIcon } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/utils/constants";
import { useSearchContext } from "@/contexts/SearchContext";

type LocationSectionProps = {
  location: LocationType;
  lastUpdated: string;
};

const LocationSection = ({ location, lastUpdated }: LocationSectionProps) => {
  const pathname = usePathname();
  const { setSearch } = useSearchContext();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    (async () => {
      const bookmarks = await AsyncStorage.getItem("bookmarks");
      setIsBookmarked(!!bookmarks?.includes(location.name));
    })();
  }, [pathname]);

  const handleToggleBookmark = async () => {
    const bookmarks = await AsyncStorage.getItem("bookmarks");
    const bookmarksArray = JSON.parse(bookmarks || "[]");

    if (!bookmarksArray.includes(location.name)) {
      bookmarksArray.push(location.name);
      await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
      setIsBookmarked(true);
    } else {
      const newBookmarks = bookmarksArray.filter(
        (bookmark: string) => bookmark !== location.name
      );
      await AsyncStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      setIsBookmarked(false);
    }
  };

  const handlePressLocation = async () => {
    await AsyncStorage.setItem("search", location.name);
    setSearch(location.name);
    router.push('/forecast');
  }

  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <Text onPress={handlePressLocation} style={styles.name}>{location.name}</Text>
        <TouchableOpacity onPress={handleToggleBookmark}>
          <BookmarkIcon
            color={COLORS.primary}
            fill={COLORS.primary}
            fillOpacity={isBookmarked ? 100 : 0}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.time}>
        Last Updated: {moment(lastUpdated).format("DD MMM - hh:mm A")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
  },
  time: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
});

export default LocationSection;
