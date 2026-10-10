import * as Location from "expo-location";
import { Alert } from "react-native";

export async function requestLocationPermission() {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  const granted = status === Location.PermissionStatus.GRANTED;

  if (!granted) {
    Alert.alert(
      "Location permission",
      "This app uses your location to show nearby places and services. You can enable location access later in Settings."
    );
  }

  return granted;
}
