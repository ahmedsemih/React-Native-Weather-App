import { CircleArrowUp } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/utils/constants";

type WindCardProps = {
  windSpeed: number;
  windDegree: number;
  windDirection: string;
};

const WindCard = ({ windSpeed, windDegree, windDirection }: WindCardProps) => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Wind Card</Text>
      <Text style={styles.value}>{windSpeed} km/h</Text>
      <View style={styles.directionSection}>
        <CircleArrowUp
          color={COLORS.text}
          width={24}
          height={24}
          style={{ transform: [{ rotate: `${windDegree}deg` }] }}
        />
        <Text style={styles.directionText}>
          {windDegree}° {windDirection}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  value: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  directionSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  directionText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold"
  }
});

export default WindCard;
