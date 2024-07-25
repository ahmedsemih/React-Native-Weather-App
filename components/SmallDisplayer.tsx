import { StyleSheet, Text, View } from "react-native";

type SmallDisplayerProps = {
  value: number;
  symbol: string;
  title: string;
};

const SmallDisplayer = ({ value, symbol, title }: SmallDisplayerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.valueSection}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  valueSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
  },
  value: {
    fontSize: 32,
    fontFamily: "Inter-SemiBold",
  },
  symbol: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: "Inter-SemiBold",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
});

export default SmallDisplayer;
