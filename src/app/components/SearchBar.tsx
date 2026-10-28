import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { searchOrganizations } from "../services/organization";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

type OrganizationResultsProps = {
  query: string;
};

// Search input
export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#777" />

        <TextInput
          placeholder="Αναζήτηση..."
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          returnKeyType="search"
          style={styles.searchInput}
        />
      </View>
    </View>
  );
}

// Search results — same file
export function OrganizationResults({
  query,
}: OrganizationResultsProps) {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setOrganizations([]);
      setLoading(false);
      setError(false);
      return;
    }

    let active = true;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);

      try {
        const results = await searchOrganizations(trimmedQuery);

        if (active) {
          setOrganizations(results.results ?? results);
        }
      } catch (err) {
        console.error("Search error:", err);

        if (active) {
          setOrganizations([]);
          setError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  if (query.trim().length < 2) return null;

  return (
    <View style={styles.resultsContainer}>
      {loading && <ActivityIndicator style={styles.loader} />}

      {!loading && error && (
        <Text style={styles.message}>
          Search failed. Please try again.
        </Text>
      )}

      {!loading && !error && (
        <FlatList
          data={organizations}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable style={styles.resultItem}>
              {item.images?.length > 0 && (
                <Image
                  source={{ uri: item.images[0].image_url }}
                  style={styles.organizationImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.organizationInfo}>
                <Text style={styles.resultTitle}>
                  {item.name}
                </Text>

                <Text style={styles.resultCategory}>
                  {item.organization_type?.name}
                </Text>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Δεν βρέθηκαν αποτελέσματα.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: "#F2F2F2",
    height: 46,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loader: {
    marginVertical: 12,
  },
  resultItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDD",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#102A4C",
  },
  resultCategory: {
    color: "#6B7280",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 24,
    color: "#6B7280",
  },
  message: {
    marginTop: 12,
    color: "#B91C1C",
  },
  organizationImage: {
    width: 150,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
  },

  organizationInfo: {
    flex: 1,
    justifyContent: "center",
  },
});
