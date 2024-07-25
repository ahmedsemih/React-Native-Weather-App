import { StyleSheet, Text, View } from "react-native";

import BigDisplayer from "./BigDisplayer";
import SmallDisplayer from "./SmallDisplayer";

type CurrentSectionProps = {
  current: CurrentWeather;
};

const CurrentSection = ({ current }: CurrentSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.condition}>{current.condition.text}</Text>
      <View style={styles.tempSection}>
        <BigDisplayer 
          value={current.temp_c} 
          title="Temperature" 
          symbol="°C" 
        />
        <BigDisplayer
          value={current.feelslike_c}
          title="Feels Like"
          symbol="°C"
        />
      </View>
      <View style={styles.detailsSection}>
        <SmallDisplayer 
          value={current.humidity} 
          title="Humidity" 
          symbol="%"
        />
        <SmallDisplayer
          value={current.wind_kph}
          title="Wind Speed"
          symbol="km/h"
        />
        <SmallDisplayer
          value={current.pressure_mb}
          title="Pressure"
          symbol="mb"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  condition: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    marginBottom: 8,
  },
  tempSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 32,
  },
  detailsSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CurrentSection;
