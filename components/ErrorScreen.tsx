import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CloudHailIcon, RotateCcwIcon } from "lucide-react-native";

import { COLORS } from "@/utils/constants";

type ErrorScreenProps = {
  refetch: () => any;
};

const ErrorScreen = ({ refetch }: ErrorScreenProps) => {
  const handleBackToSearch = () => router.replace("/");

  return (
    <SafeAreaView style={styles.container}>
      <CloudHailIcon
        width={200}
        height={200}
        style={styles.icon}
        color={COLORS.primary}
      />
      <Text style={styles.message}>
        Something went wrong while fetching weather forecast.
      </Text>
      <TouchableOpacity onPress={() => refetch()} style={styles.button}>
        <RotateCcwIcon color={COLORS.background} />
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackToSearch} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    width: "100%",
    height: "100%",
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 24,
    color: COLORS.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    color: COLORS.background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonText: {
    color: COLORS.background,
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 16,
    color: COLORS.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  backButtonText: {
    color: COLORS.primary,
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
  },
});

export default ErrorScreen;
