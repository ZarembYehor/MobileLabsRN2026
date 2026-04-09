import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

const InitialLayout = () => {
  const { firebaseUser } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!firebaseUser && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (firebaseUser && firebaseUser.emailVerified && inAuthGroup) {
      router.replace("/(app)");
    } else if (firebaseUser && !firebaseUser.emailVerified && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
  }, [firebaseUser, segments]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}