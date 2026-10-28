
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { getOrganization } from "./../services/organization";

type Organization = {
  id: number | string;
  name: string;
  description?: string | null;
  phone?: string | null;
  address?: string | null;
  email?: string | null;
  website?: string | null;
  images?: { id?: number | string; image_url: string }[];
  organization_type?: { name?: string } | null;
};

export default function OrganizationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [organization, setOrganization] =
    useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadOrganization() {
      try {
        setLoading(true);
        setError(false);

        const data = await getOrganization(id);

        if (active) {
          setOrganization(data);
        }
      } catch (err) {
        console.error("Organization details error:", err);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    if (id) loadOrganization();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !organization) {
    return (
      <View style={styles.center}>
        <Text>Δεν ήταν δυνατή η φόρτωση των στοιχείων.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {organization.images?.map((image, index) => (
        <Image
          key={image.id ?? image.image_url ?? index}
          source={{ uri: image.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      ))}

      <View style={styles.content}>
        <Text style={styles.title}>{organization.name}</Text>

        {!!organization.organization_type?.name && (
          <Text style={styles.category}>
            {organization.organization_type.name}
          </Text>
        )}

        {!!organization.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Περιγραφή</Text>
            <Text style={styles.value}>
              {organization.description}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Επικοινωνία</Text>

          {[
            {
              icon: "call-outline" as const,
              label: "Τηλέφωνο",
              value: organization.phone,
            },
            {
              icon: "location-outline" as const,
              label: "Διεύθυνση",
              value: organization.address,
            },
            {
              icon: "mail-outline" as const,
              label: "Email",
              value: organization.email,
            },
            {
              icon: "globe-outline" as const,
              label: "Ιστοσελίδα",
              value: organization.website,
            },
          ]
            .filter((item) => !!item.value)
            .map((item) => (
              <View key={item.label} style={styles.detailRow}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color="#2563EB"
                />
                <View style={styles.detailInfo}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#F3F4F6",
  },
  content: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#102A4C",
  },
  category: {
    marginTop: 8,
    color: "#2563EB",
  },
  section: { marginTop: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#102A4C",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDD",
  },
  detailInfo: { flex: 1 },
  label: { fontSize: 12, color: "#6B7280" },
  value: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
});
