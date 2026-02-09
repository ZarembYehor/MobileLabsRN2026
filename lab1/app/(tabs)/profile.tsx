import { ThemedText } from "@/components/themed-text";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.title}>Реєстрація</ThemedText>
            <ThemedText>Електронна пошта</ThemedText>
            <TextInput style={styles.input}/>
            <ThemedText>Пароль</ThemedText>
            <TextInput style={styles.input}/>
            <ThemedText>Пароль (ще раз)</ThemedText>
            <TextInput style={styles.input}/>
            <ThemedText>Прізвище</ThemedText>
            <TextInput style={styles.input}/>
            <ThemedText>Ім`я</ThemedText>
            <TextInput style={styles.input}/>
            <Button
                title="Зареєструватись"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        margin: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        margin: 10
    }
})