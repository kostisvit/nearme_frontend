import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CurrentLocation from "../components/CurrentLocation";
import OrgTypeScreen from "../components/OrganizationType";
import SearchBar, {
  OrganizationResults,
} from "../components/SearchBar";

export default function HomeScreen() {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CurrentLocation />

        <SearchBar
          value={query}
          onChangeText={setQuery}
        />

        <OrgTypeScreen />

        <OrganizationResults query={query} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    flexDirection: "column",
    gap: 4,
    paddingTop: 4,
  },
});
