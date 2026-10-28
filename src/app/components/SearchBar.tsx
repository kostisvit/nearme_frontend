
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
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { searchOrganizations } from "../services/organization";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

type OrganizationResultsProps = {
  query: string;
};

type Organization = {
  id: number | string;
  name: string;
  images?: {
    id?: number | string;
    image_url: string;
  }[];
  organization_type?: {
    name?: string;
  } | null;
  phone?: string | null;
  address?: string | null;
  email?: string | null;
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

// Search results
export function OrganizationResults({
  query,
}: OrganizationResultsProps) {
  const router = useRouter();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
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
        if (active) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  if (query.trim().length < 2) return null;

  const renderItem = ({ item }: { item: Organization }) => {
    const imageUrl = item.images?.[0]?.image_url;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.resultItem,
          pressed && styles.resultItemPressed,
        ]}
        onPress={() =>
          router.push({
            pathname: "/organization/[id]",
            params: { id: String(item.id) },
          })
        }
        accessibilityRole="button"
        accessibilityLabel={`Προβολή στοιχείων ${item.name}`}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.organizationImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="business-outline"
              size={34}
              color="#9CA3AF"
            />
          </View>
        )}

        <View style={styles.organizationInfo}>
          <Text style={styles.resultTitle} numberOfLines={2}>
            {item.name}
          </Text>

          {!!item.organization_type?.name && (
            <Text style={styles.resultCategory} numberOfLines={1}>
              {item.organization_type.name}
            </Text>
          )}

          {!!item.phone && (
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={14} color="#64748B" />
              <Text style={styles.detailText} numberOfLines={1}>
                {item.phone}
              </Text>
            </View>
          )}

          {!!item.address && (
            <View style={styles.detailRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color="#64748B"
              />
              <Text style={styles.detailText} numberOfLines={2}>
                {item.address}
              </Text>
            </View>
          )}

          {!!item.email && (
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={14} color="#64748B" />
              <Text style={styles.detailText} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
          )}

          <Text style={styles.viewDetails}>
            Περισσότερα στοιχεία
            <Ionicons name="chevron-forward" size={12} color="#2563EB" />
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.resultsContainer}>
      {loading && <ActivityIndicator style={styles.loader} />}

      {!loading && error && (
        <Text style={styles.message}>
          Η αναζήτηση απέτυχε. Παρακαλώ δοκιμάστε ξανά.
        </Text>
      )}

      {!loading && !error && (
        <FlatList
          data={organizations}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  loader: {
    marginVertical: 12,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  resultItemPressed: {
    backgroundColor: "#F8FAFC",
    opacity: 0.85,
  },
  organizationImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
  },
  imagePlaceholder: {
    width: 100,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  organizationInfo: {
    flex: 1,
    gap: 6,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#102A4C",
  },
  resultCategory: {
    color: "#2563EB",
    fontSize: 13,
    marginBottom: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  detailText: {
    flex: 1,
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 17,
  },
  viewDetails: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "600",
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
});
