
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
type CurrentLocationData = {
  latitude: number;
  longitude: number;
  address: string;
};

export default function CurrentLocation() {
  const [location, setLocation] =
    useState<CurrentLocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission is required.");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = position.coords;

      let address = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

      try {
        const results = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (results.length > 0) {
          const place = results[0];

          address = [
            place.name,
            // place.street,
            place.city,
            place.region,
            place.country,
          ]
            .filter(Boolean)
            .filter((value, index, array) => array.indexOf(value) === index)
            .join(", ") || address;
        }
      } catch {
        // Keep coordinates if reverse geocoding fails.
      }

      setLocation({ latitude, longitude, address });
    } catch {
      setError(
        "Unable to get your location. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Καλημέρα!";
    }

    if (hour >= 12 && hour < 17) {
      return "Καλό μεσημέρι!";
    }

    if (hour >= 17 && hour < 21) {
      return "Καλησπέρα!";
    }

    return "Καληνύχτα!";
  };

  return (
    <View>
      {/* Current location */}
      <View style={styles.locationRow}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name="location-outline"
            size={22}
            color="#173D73"
          />
        </View>

        <View style={styles.locationInfo}>
          <Text style={styles.label}>Η τοποθεσία σου</Text>

          {loading ? (
            <View style={styles.status}>
              <ActivityIndicator size="small" color="#173D73" />
              <Text style={styles.message}>
                Εντοπισμός τοποθεσίας...
              </Text>
            </View>
          ) : error ? (
            <Text style={styles.error} numberOfLines={2}>
              {error}
            </Text>
          ) : location ? (
            <Text style={styles.address} numberOfLines={2}>
              {location.address}
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={getCurrentLocation}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Ανανέωση τοποθεσίας"
          style={({ pressed }) => [
            styles.locationButton,
            pressed && styles.locationButtonPressed,
            loading && styles.locationButtonDisabled,
          ]}
        >
          <Ionicons
            name="locate-outline"
            size={21}
            color="#173D73"
          />
        </Pressable>
      </View>

      {/* Greeting BELOW the location */}
      <View style={styles.greetingContainer}>
      <Text style={styles.greetingTitle}>
        {getGreeting()}
        </Text>
        <Text style={styles.greetingSubtitle}>
          Βρες τις καλύτερες τοπικές επιχειρίσεις δίπλα σου.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF4FC",
    alignItems: "center",
    justifyContent: "center",
  },

  locationInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8A94A6",
    letterSpacing: 0.4,
  },

  address: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
    color: "#172B4D",
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  message: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
  },

  error: {
    fontSize: 13,
    lineHeight: 18,
    color: "#DC2626",
  },

  locationButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F3F6FA",
    alignItems: "center",
    justifyContent: "center",
  },

  locationButtonPressed: {
    backgroundColor: "#DCE8F8",
    transform: [{ scale: 0.95 }],
  },

  locationButtonDisabled: {
    opacity: 0.5,
  },
  greetingContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 6,
  },

  greetingTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#172B4D",
    letterSpacing: -0.5,
  },

  greetingSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },
});
