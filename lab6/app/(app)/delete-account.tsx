import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { authentication, db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

export default function DeleteAccountScreen() {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { setFirebaseUser } = useAuth();

  const confirmDeletion = () => {
    if (!password) {
      setError("Введіть пароль для підтвердження");
      return;
    }

    Alert.alert(
      "Підтвердження видалення",
      "Ви впевнені, що хочете видалити акаунт? Ця дія є незворотною і всі ваші дані будуть втрачені.",
      [
        { text: "Скасувати", style: "cancel" },
        { text: "Видалити", style: "destructive", onPress: handleDeleteAccount },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    const user = authentication.currentUser;

    if (!user || !user.email) {
      setError("Сесія закінчилась. Перезайдіть в акаунт.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, "users", user.uid));

      await deleteUser(user);

      setFirebaseUser(null);
      Alert.alert("Успішно", "Ваш акаунт було видалено.");
      router.replace("/(auth)/login");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Невірний пароль. Спробуйте ще раз.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Забагато спроб. Спробуйте пізніше.");
      } else {
        setError("Помилка видалення акаунта. Спробуйте ще раз.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Видалення акаунта</Text>

        <Text style={styles.description}>
          Для видалення профілю введіть свій поточний пароль. Це необхідно для безпеки вашого акаунта.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ваш пароль"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(null);
          }}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={confirmDeletion} disabled={isLoading}>
          <Text style={styles.buttonText}>Видалити акаунт</Text>
          {isLoading && <ActivityIndicator color="#fff" style={styles.loader} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Скасувати</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  innerContainer: { 
    flex: 1, 
    paddingHorizontal: 30, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#e53935", 
    marginBottom: 15, 
    textAlign: "center" 
  },
  description: { 
    fontSize: 14, 
    color: "#666", 
    textAlign: "center", 
    marginBottom: 30 
  },
  input: { 
    width: "100%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginBottom: 10 
  },
  errorText: { 
    color: "red", 
    fontSize: 13, 
    marginBottom: 15 
  },
  button: { 
    width: "100%", 
    height: 50, 
    backgroundColor: "#e53935", 
    borderRadius: 8, 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  buttonDisabled: { 
    backgroundColor: "#ef9a9a" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  loader: { 
    marginLeft: 10 
  },
  backButton: { 
    marginTop: 20,
    alignItems: "center" 
  },
  backText: { 
    color: "#666", 
    fontSize: 14 
  },
});