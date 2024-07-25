import moment from "moment";
import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/utils/constants";

type ForecastCardProps = {
  day: DailyWeather;
  date: string;
  isToday?: boolean;
};

const ForecastCard = ({ day, date, isToday }: ForecastCardProps) => {
  return (
    <View style={styles.cardBody}>
      <Text style={styles.day}>
        {isToday ? "Today" : moment(date).format("dddd")}
      </Text>
      <Image
        source={{ uri: `https://${day.condition.icon}` }}
        resizeMode="cover"
        style={styles.icon}
      />
      <Text style={styles.maxTemp}>{Math.round(day.maxtemp_c)}°C</Text>
      <Text style={styles.minTemp}>{Math.round(day.mintemp_c)}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 16,
    maxHeight: 208,
  },
  day: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  icon: {
    width: 88,
    height: 88,
    marginBottom: 8,
  },
  maxTemp: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  minTemp: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});

export default ForecastCard;
