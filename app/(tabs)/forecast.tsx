import moment from "moment";
import { useState } from "react";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import {
  CurrentSection,
  ErrorScreen,
  ForecastCard,
  LoadingScreen,
  LocationSection,
  Search,
} from "@/components";
import { COLORS } from "@/utils/constants";
import { getWeatherForecast } from "@/services/ApiService";
import { useSearchContext } from "@/contexts/SearchContext";

const ForecastScreen = () => {
  const { search } = useSearchContext();
  const [refreshing, setRefreshing] = useState(false);

  if (search === "") router.replace("/");

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["forecast", search],
    queryFn: () => getWeatherForecast(search),
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (isPending || search === "") return <LoadingScreen />;

  if (isError) return <ErrorScreen refetch={refetch} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.view}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.currentSection}>
          <Search />
          <LocationSection
            location={data?.location!}
            lastUpdated={data?.current.last_updated}
          />
          <CurrentSection current={data?.current!} />
        </View>
        <View style={styles.forecastSection}>
          {data?.forecast.forecastday.map((day: ForecastDay) => (
            <ForecastCard
              isToday={moment().isSame(day.date, "day")}
              key={day.date}
              day={day.day}
              date={day.date}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    width: "100%",
    height: "100%",
    paddingTop: 24,
  },
  view: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
    display: "flex",
  },
  currentSection: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 32,
    flex: 1,
  },
  forecastSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 36,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: COLORS.backgroundSoft,
  },
});

export default ForecastScreen;
