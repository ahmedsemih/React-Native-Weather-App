import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/utils/constants";

type PercentageProps = {
  title: string;
  value: number;
  messages: { low: string; medium: string; high: string };
};

const Percentage = ({ title, value, messages }: PercentageProps) => {
  const level = value <= 30 ? "low" : value <= 70 ? "medium" : "high";

  return (
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}%</Text>
      <Text style={styles.message}>{messages[level]}</Text>
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
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  message: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    textTransform: "capitalize",
  },
  value: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
});

export default Percentage;
