import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/utils/constants";

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});

export default LoadingScreen;
