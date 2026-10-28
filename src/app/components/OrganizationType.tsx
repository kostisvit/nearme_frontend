import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { getOrgTypes, OrgType } from "../services/orgTypes";



const colors = [
    { background: "#E3F2FD", icon: "#1565C0" },
    { background: "#E8F5E9", icon: "#2E7D32" },
    { background: "#FFF3E0", icon: "#EF6C00" },
    { background: "#F3E5F5", icon: "#7B1FA2" },
    { background: "#FCE4EC", icon: "#C2185B" },
    { background: "#E0F2F1", icon: "#00796B" },
  ];


export default function OrgTypeScreen() {
  const [orgtypes, setOrgType] = useState<OrgType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function loadOrgTypes() {
      try {
        setLoading(true);
        setError(null);

        const results = await getOrgTypes("");

        setOrgType(results.results ?? results);
      } catch (error) {
        console.error("Loading organization types failed:", error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    }

    loadOrgTypes();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.message}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Κατηγορίες</Text>
        </View>

      <FlatList
        horizontal
        data={orgtypes}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
            const color = colors[item.id % colors.length];

            return (
              <View
                style={[
                  styles.categoryItem,
                  { backgroundColor: color.background },
                ]}
              >
                <MaterialIcons
                  name={
                    item.icon as React.ComponentProps<
                      typeof MaterialIcons
                    >["name"]
                  }
                  size={24}
                  color={color.icon}
                />
              </View>
            );
          }}
        ListEmptyComponent={
          <Text>Δεν βρέθηκαν αποτελέσματα.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 0,
    },
    loader: {
      marginVertical: 8,
    },
    message: {
      paddingVertical: 4,
    },
    category: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginRight: 8,
      borderRadius: 8,
      backgroundColor: "#FFFFFF",
      color: "#102A4C",
    },
    categoryItem: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        width: 52,
        height: 52,
        borderRadius: 16,
      },
    sectionHeader: {
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: "#102A4C",
    },
    categorItem: {
        backgroundColor: 'red'
    }

  });
