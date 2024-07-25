import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/utils/constants";
import getUVAlert from "@/utils/getUvAlert";

type UVCardProps = {
  uv: number;
};

const UVCard = ({ uv }: UVCardProps) => {
  const UvValues = getUVAlert(uv);

  return (
    <View style={styles.body}>
      <Text style={styles.title}>UV Index</Text>
      <View style={styles.tupe}>
        <View
          // @ts-ignore
          style={{
            width: UvValues.width,
            height: "100%",
            backgroundColor: UvValues.color,
            borderRadius: 16,
          }}
        />
      </View>
      <Text style={styles.message}>{`${UvValues.message} (${uv})`}</Text>
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
    width: "100%",
    gap: 16,
  },
  tupe: {
    borderWidth: 2,
    borderColor: COLORS.text,
    height: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  message: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  }
});

export default UVCard;
