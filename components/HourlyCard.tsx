import moment from "moment";
import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/utils/constants";

type HourlyCardProps = {
  data: HourlyWeather;
  isCurrentHour?: boolean;
};

const HourlyCard = ({ data, isCurrentHour }: HourlyCardProps) => {
  return (
    <View
      style={{
        ...styles.cardBody,
        borderColor: isCurrentHour ? COLORS.text : "transparent",
      }}
    >
      <View style={styles.section}>
        <Text style={styles.time}>
          {isCurrentHour ? "Current" : moment(data.time).format("hh:mm A")}
        </Text>
        <Image
          source={{ uri: `https://${data.condition.icon}` }}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.data}>{Math.round(data.temp_c)}°C</Text>
        <Text style={styles.info}>Temperature</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.data}>{Math.round(data.feelslike_c)}°C</Text>
        <Text style={styles.info}>Feels Like</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.data}>{data.humidity}%</Text>
        <Text style={styles.info}>Humidity</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    gap: 8,
    marginTop: 16,
    borderWidth: 2,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 64,
    height: 64,
    borderWidth: 1,
  },
  time: {
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
  },
  data: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
  },
  info: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
});

export default HourlyCard;
