import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { authentication, db } from "@/firebase/config";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Заповніть всі поля");
      return;
    }
    if (password !== confirmPassword) {
      setError("Паролі не збігаються");
      return;
    }
    if (password.length < 6) {
      setError("Пароль має бути не менше 6 символів");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        name: "",
        age: null,
        city: "",
        email: user.email,
        createdAt: new Date(),
      });

      Alert.alert(
        "Успіх",
        "Акаунт створено! Перевірте пошту для підтвердження.",
        [{ text: "ОК", onPress: () => router.replace("/(auth)/login") }]
      );
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Цей email вже використовується");
      } else if (err.code === "auth/invalid-email") {
        setError("Неправильний формат email");
      } else {
        setError("Помилка при реєстрації. Спробуйте ще раз.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Реєстрація</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Пароль"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          returnKeyType="next"
          onSubmitEditing={() => confirmRef.current?.focus()}
        />

        <TextInput
          ref={confirmRef}
          style={styles.input}
          placeholder="Підтвердження паролю"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          returnKeyType="done"
          onSubmitEditing={handleSignUp}
        />

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleSignUp} disabled={isLoading}>
          <Text style={styles.buttonText}>Зареєструватись</Text>
          {isLoading && <ActivityIndicator color="#fff" style={styles.loader} />}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Вже маєте акаунт? </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.linkText}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: 30 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#3d5af1", 
    marginBottom: 40 
  },
  input: { 
    width: "100%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginBottom: 15, 
    fontSize: 16 
  },
  errorText: { 
    color: "red", 
    marginBottom: 15, 
    textAlign: "left", 
    width: "100%" 
  },
  button: { 
    width: "100%", 
    height: 50, 
    backgroundColor: "#3d5af1", 
    borderRadius: 8, 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 10 
  },
  buttonDisabled: { 
    backgroundColor: "#a0acf7" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  loader: { 
    marginLeft: 10 
  },
  footer: { 
    flexDirection: "row", 
    marginTop: 25 
  },
  footerText: { 
    color: "#666", 
    fontSize: 14 
  },
  linkText: { 
    color: "#3d5af1", 
    fontSize: 14, 
    fontWeight: "bold" 
  },
});