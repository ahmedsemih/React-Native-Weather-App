import { Sunrise, Sunset } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/utils/constants";

type SunCardProps = {
  sunrise: string;
  sunset: string;
};

const SunCard = ({ sunrise, sunset }: SunCardProps) => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Sunrise & Sunset</Text>
      <View style={styles.valueSection}>
        <Sunrise width={36} height={36} color={"#ffdd40"} />
        <Text style={styles.value}>{sunrise}</Text>
      </View>
      <View style={styles.valueSection}>
        <Sunset width={36} height={36} color={"#ffdd40"} />
        <Text style={styles.value}>{sunset}</Text>
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
    justifyContent: "space-between",
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  valueSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  value: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  icon: {
    width: 36,
    height: 36,
  },
});

export default SunCard;
