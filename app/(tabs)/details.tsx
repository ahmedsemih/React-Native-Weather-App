import { useState } from "react";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import {
  ErrorScreen,
  HourlyCard,
  LoadingScreen,
  PercentageCard,
  SunCard,
  UVCard,
  WindCard,
} from "@/components";
import { COLORS } from "@/utils/constants";
import { getWeatherForecast } from "@/services/ApiService";
import { useSearchContext } from "@/contexts/SearchContext";
import moment from "moment";

const DetailsScreen = () => {
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
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={data.forecast.forecastday[0].hour}
        keyExtractor={(item) => item.time_epoch.toString()}
        renderItem={({ item }) => {
          const isCurrentHour = moment(item.time).isSame(moment(), 'hour');
          return <HourlyCard data={item} isCurrentHour={isCurrentHour} />;
        }}
        ListHeaderComponent={
          <View style={styles.highlights}>
            <Text style={styles.title}>Today's Highlights</Text>
            <WindCard
              windDegree={data.current.wind_degree}
              windSpeed={data.current.wind_kph}
              windDirection={data.current.wind_dir}
            />
            <SunCard
              sunrise={data.forecast.forecastday[0].astro.sunrise}
              sunset={data.forecast.forecastday[0].astro.sunset}
            />
            <UVCard uv={data.current.uv} />
            <PercentageCard
              title="Humidity"
              value={data.forecast.forecastday[0].day.avghumidity}
              messages={{ low: "dry", medium: "comfortable", high: "humid" }}
            />
            <PercentageCard
              title="Chance of Rain"
              value={data.forecast.forecastday[0].day.daily_chance_of_rain}
              messages={{
                low: "not possible",
                medium: "possible",
                high: "probably",
              }}
            />
            <Text style={styles.title}>Hourly Forecast</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundSoft,
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
    paddingHorizontal: 16,
  },
  highlights: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginTop: 32,
    width: "100%",
  },
});

export default DetailsScreen;
