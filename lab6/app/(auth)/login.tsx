import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authentication } from "../../firebase/config";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setFirebaseUser } = useAuth();
  const passwordRef = useRef<TextInput>(null);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(authentication, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(authentication);
        Alert.alert(
          "Email не підтверджено",
          "Будь ласка, підтвердьте свою електронну адресу, перейшовши за посиланням у листі, який ми надіслали під час реєстрації."
        );
        setFirebaseUser(null);
        return;
      }

      setFirebaseUser(user);
    } catch (error: any) {
      console.error("Email Sign-In Error:", error);
      Alert.alert("Помилка входу", "Неправильний email або пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: "https://ztu.edu.ua/img/logo/university-colored.png" }}
          style={styles.logo}
          resizeMode="contain"
        />

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
          returnKeyType="done"
          onSubmitEditing={handleSignIn}
        />

        <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleSignIn} disabled={isLoading}>
          <Text style={styles.buttonText}>Увійти</Text>
          {isLoading && <ActivityIndicator color="#fff" style={styles.loader} />}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Немає облікового запису? </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/register")}>
            <Text style={styles.linkText}>Зареєструватись</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/reset-password")} style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Забули пароль?</Text>
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
    justifyContent: "center", 
    alignItems: "center" 
  },
  logo: { 
    width: "80%", 
    height: 120, 
    marginBottom: 30 
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
  forgotContainer: { 
    marginTop: 15 
  },
  forgotText: { 
    color: "#3d5af1", 
    fontSize: 14 
  },
});