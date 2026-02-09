import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function News() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/images/image.jpg')} 
                    style={styles.image}
                    contentFit="cover" 
                />
            </View>
            <View style={styles.information}>
                <Text style={[styles.text, styles.title]}>Заголовок новини</Text>
                <Text style={styles.date}>Дата новини</Text>
                <Text style={styles.text} numberOfLines={2}>Короткий текст новини...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        height: 120, 
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    information: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    date: {
        color: 'gray',
        fontSize: 12,
        marginBottom: 4,
    }
})