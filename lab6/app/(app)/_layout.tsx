import { Stack } from "expo-router";

export default function AppLayout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="delete-account"/>
        <Stack.Screen name="profile"/>
    </Stack>
}