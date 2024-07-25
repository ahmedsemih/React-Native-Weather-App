import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";

import { COLORS } from "@/utils/constants";
import { LoadingScreen } from "@/components";
import BookmarkCard from "@/components/BookmarkCard";

const BookmarksScreen = () => {
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getBookmarks();
      setLoading(false);
    }, [])
  );

  const getBookmarks = async () => {
    const bookmarks = (await AsyncStorage.getItem("bookmarks")) || "[]";
    const bookmarksArray = JSON.parse(bookmarks);
    setBookmarks(bookmarksArray);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getBookmarks();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={bookmarks}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <BookmarkCard bookmark={item} />}
        ListHeaderComponent={<Text style={styles.title}>Bookmarks</Text>}
        ListEmptyComponent={
          <Text style={styles.message}>
            You have not bookmarked any location yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.backgroundSoft,
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    paddingLeft: 8,
    fontFamily: "Inter-Bold",
  },
  message: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    paddingLeft: 8,
    marginTop: 8,
  },
});

export default BookmarksScreen;
