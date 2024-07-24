import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import * as Location from "expo-location";
import { MapPinIcon, SearchIcon } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "@/utils/constants";
import { useSearchContext } from "@/contexts/SearchContext";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const { setSearch } = useSearchContext();

  const handleSearch = async () => {
    if (input.trim() === "") return;

    setSearch(input);
    await AsyncStorage.setItem("search", input);
    router.replace("/forecast");
    setInput("");
  };

  const handleLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert(
        "Permission to access location was denied. Please enable location services."
      );
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log(latitude, longitude);

    setSearch(`${latitude},${longitude}`);
    await AsyncStorage.setItem("search", `${latitude},${longitude}`);
    router.replace("/forecast");
    setInput("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.locationBtn} onPress={handleLocation}>
        <MapPinIcon color={COLORS.background} strokeWidth={2} />
      </TouchableOpacity>
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSearch}
        style={styles.input}
        cursorColor={COLORS.primary}
        spellCheck={false}
        placeholder="Search a Location..."
        keyboardType="default"
      />
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <SearchIcon color={COLORS.primary} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: COLORS.backgroundSoft,
    borderRadius: 16,
  },
  locationBtn: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.background,
  },
  searchBtn: {
    padding: 8,
    borderRadius: 100,
    position: "absolute",
    top: 2,
    right: 4,
  },
});

export default Search;
