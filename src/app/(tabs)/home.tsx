
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentLocation from "../components/CurrentLocation";


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <CurrentLocation />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    margin: 16,
  },
});
