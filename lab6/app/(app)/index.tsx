import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { authentication } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { firebaseUser, setFirebaseUser } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(authentication);
      setFirebaseUser(null);
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://ztu.edu.ua/img/logo/university-colored.png" }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Ласкаво просимо!</Text>
          <Text style={styles.emailText}>{firebaseUser?.email}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>UID:</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {firebaseUser?.uid}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email підтверджено:</Text>
            <Text style={[styles.infoValue, { color: firebaseUser?.emailVerified ? "#43a047" : "#e53935" }]}>
              {firebaseUser?.emailVerified ? "Так" : "Ні"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/profile")}>
          <Text style={styles.profileButtonText}>Мій профіль</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Вийти з акаунту</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteLink} onPress={() => router.push("/delete-account")}>
          <Text style={styles.deleteLinkText}>Видалити профіль</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5" 
  },
  header: { 
    backgroundColor: "#fff", 
    paddingTop: 40, 
    paddingBottom: 20, 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor: "#eee" 
  },
  logo: { 
    width: "70%", 
    height: 80 
  },
  content: { 
    padding: 20, 
    alignItems: "center" 
  },
  card: { 
    width: "100%", 
    backgroundColor: "#fff", 
    borderRadius: 15, 
    padding: 20, 
    shadowColor: "#000", 
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 5, 
    marginTop: 20 
  },
  welcomeText: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 5 
  },
  emailText: { 
    fontSize: 16, 
    color: "#3d5af1", 
    marginBottom: 20 
  },
  divider: { 
    height: 1, 
    backgroundColor: "#eee", 
    marginBottom: 20 
  },
  infoRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 15 
  },
  infoLabel: { 
    fontSize: 14, 
    color: "#666", 
    flex: 1 
  },
  infoValue: { 
    fontSize: 14, 
    fontWeight: "500", 
    color: "#333", 
    flex: 2, 
    textAlign: "right" 
  },
  profileButton: { 
    marginTop: 20, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    backgroundColor: "#3d5af1", 
    borderRadius: 8, 
    width: "80%", 
    alignItems: "center" 
  },
  profileButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  signOutButton: { 
    marginTop: 20, 
    padding: 15 
  },
  signOutText: { 
    color: "#e53935", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  deleteLink: { 
    marginTop: 15, 
    padding: 10 
  },
  deleteLinkText: { 
    color: "#666", 
    fontSize: 14, 
    textDecorationLine: "underline" 
  },
});