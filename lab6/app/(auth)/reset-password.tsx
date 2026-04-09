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
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "@/firebase/config"; 

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Будь ласка, введіть email");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(authentication, email);
      
      Alert.alert(
        "Лист надіслано",
        "Перевірте свою поштову скриньку для скидання пароля.",
        [{ text: "ОК", onPress: () => router.back() }]
      );
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("Користувача з таким email не знайдено");
      } else {
        setError("Помилка при відправці листа. Перевірте правильність email.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Відновлення паролю</Text>
        
        <Text style={styles.description}>
          Введіть email адресу вашого облікового запису. 
          Ми надішлемо вам посилання для встановлення нового паролю.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
          returnKeyType="done"
          onSubmitEditing={handlePasswordReset}
        />

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handlePasswordReset}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Надіслати лист</Text>
          {isLoading && <ActivityIndicator color="#fff" style={styles.loader} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Повернутись до входу</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3d5af1",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "left",
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#3d5af1",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#a0acf7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    marginLeft: 10,
  },
  backButton: {
    marginTop: 25,
    padding: 10,
  },
  backText: {
    color: "#3d5af1",
    fontSize: 14,
    fontWeight: "500",
  },
});