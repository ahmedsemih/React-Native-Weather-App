import { CloudSun } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Search from "@/components/Search";
import { COLORS } from "@/utils/constants";

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CloudSun color="#fff" width={200} height={200} />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.info}>
        Please search a location or use your location to get weather forecast
      </Text>
      <Search />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 16,
  },
  icon: {
    color: COLORS.background,
  },
  title: {
    fontSize: 40,
    color: COLORS.background,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginTop: 16,
  },
  info: {
    fontSize: 20,
    color: COLORS.background,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 32,
  },
});

export default IndexScreen;
