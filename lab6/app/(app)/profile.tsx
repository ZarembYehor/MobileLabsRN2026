import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function ProfileScreen() {
  const { firebaseUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (firebaseUser) {
      loadUserProfile();
    }
  }, [firebaseUser]);

  const loadUserProfile = async () => {
    if (!firebaseUser) return;
    setIsLoading(true);
    try {
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setAge(data.age?.toString() || "");
        setCity(data.city || "");
      } else {
        Alert.alert("Помилка", "Профіль не знайдено");
      }
    } catch (error) {
      console.error("Помилка завантаження профілю:", error);
      Alert.alert("Помилка", "Не вдалося завантажити профіль");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!firebaseUser) return;
    setIsSaving(true);
    try {
      const userDocRef = doc(db, "users", firebaseUser.uid);
      await updateDoc(userDocRef, {
        name: name,
        age: age ? parseInt(age, 10) : null,
        city: city,
      });
      Alert.alert("Успіх", "Профіль оновлено");
    } catch (error) {
      console.error("Помилка оновлення профілю:", error);
      Alert.alert("Помилка", "Не вдалося оновити профіль");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3d5af1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Мій профіль</Text>
        <Text style={styles.email}>{firebaseUser?.email}</Text>

        <TextInput style={styles.input} placeholder="Ім'я" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Вік" value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Місто" value={city} onChangeText={setCity} />

        <TouchableOpacity style={styles.button} onPress={handleSaveProfile} disabled={isSaving}>
          <Text style={styles.buttonText}>{isSaving ? "Збереження..." : "Зберегти"}</Text>
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
  content: { 
    padding: 20 
  },
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#333" 
  },
  email: { 
    fontSize: 16, 
    color: "#3d5af1", 
    marginBottom: 20 
  },
  input: { 
    backgroundColor: "#fff", 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: "#ddd", 
    fontSize: 16 
  },
  button: { 
    backgroundColor: "#3d5af1", 
    borderRadius: 8, 
    paddingVertical: 14, 
    alignItems: "center", 
    marginTop: 10 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});