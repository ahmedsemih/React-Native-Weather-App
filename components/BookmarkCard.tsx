import React from "react";
import moment from "moment";
import { StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import ForecastCard from "./ForecastCard";
import LocationSection from "./LocationSection";
import { getWeatherForecast } from "@/services/ApiService";

type BookmarkCardProps = {
  bookmark: string;
};

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["bookmarks", bookmark],
    queryFn: () => getWeatherForecast(bookmark),
  });

  if (isPending || isError) return null;

  return (
    <View style={styles.container}>
      <LocationSection
        location={data.location}
        lastUpdated={data.current.last_updated}
      />
      <View style={styles.forecasts}>
        {data.forecast.forecastday.map((day) => (
          <ForecastCard
            isToday={moment().isSame(day.date, "day")}
            key={day.date_epoch}
            day={day.day}
            date={day.date}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Semibold",
  },
  forecasts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 16,
  },
});

export default BookmarkCard;
