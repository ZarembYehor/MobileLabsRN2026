import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { News } from "../types/News";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList";

interface NewsItemProps {
    news: News
}

export default function NewsItem({news}: NewsItemProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Details', {newsData: news})}
        >
            <Image 
                source={news.image}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{news.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
        width: 300,
        marginBottom: 20,
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})