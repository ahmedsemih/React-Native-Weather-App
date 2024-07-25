import moment from "moment";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/utils/constants";
import { useSearchContext } from "@/contexts/SearchContext";
import { getHistoricalWeather } from "@/services/ApiService";
import { ErrorScreen, HourlyCard, LoadingScreen } from "@/components";

const HistoryScreen = () => {
  const { search } = useSearchContext();

  if (search === "") router.replace("/");

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["history", search],
    queryFn: () => getHistoricalWeather(search),
  });

  if (isPending || search === "") return <LoadingScreen />;

  if (isError) return <ErrorScreen refetch={refetch} />;

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        // @ts-ignore
        sections={data}
        keyExtractor={(item, index) => item.date + index}
        renderItem={({ item }) => (
          <FlatList
            data={item.hour}
            keyExtractor={(hour) => hour.time}
            renderItem={({ item }) => <HourlyCard data={item} />}
          />
        )}
        renderSectionHeader={({ section: { date } }) => (
          <View style={styles.dateArea}>
            <Text style={styles.date}>
              {moment(date).format("DD MMMM YYYY")}
            </Text>
            <Text style={styles.fromNow}>- {moment(date).fromNow()}</Text>
          </View>
        )}
        ListHeaderComponent={
          <Text style={styles.title}>Historical Weather Data</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundSoft,
    paddingHorizontal: 16,
    paddingTop: 16,
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    fontFamily: "Inter-Bold",
  },
  dateArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 48,
    gap: 8,
  },
  date: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
  },
  fromNow: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    color: COLORS.textMuted,
  },
});

export default HistoryScreen;
