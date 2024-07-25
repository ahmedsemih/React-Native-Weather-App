import { StyleSheet, Text, View } from "react-native";

type BigDisplayerProps = {
  value: number;
  symbol: string;
  title: string;
};

const BigDisplayer = ({ value, symbol, title }: BigDisplayerProps) => {
  return (
    <View>
      <View style={styles.valueSection}>
        <Text style={styles.value}>{Math.round(value)}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  valueSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  value: {
    fontSize: 88,
    fontFamily: "Inter-SemiBold",
  },
  symbol: {
    fontSize: 24,
    marginTop: 24,
    fontFamily: "Inter-SemiBold",
  },
  title: {
    fontFamily: "Inter-Regular",
    marginTop: -8,
    marginLeft: 8,
    fontSize: 16,
    textAlign: "center",
  },
});

export default BigDisplayer;
