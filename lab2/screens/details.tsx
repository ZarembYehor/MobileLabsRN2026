import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/RootStackParamList";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function Details({ route }: Props) {
    const { newsData } = route.params;

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={newsData.image}
                    style={styles.image}
                />
                
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{newsData.title}</Text>

                    <View style={styles.separator} />
                    
                    <Text style={styles.description}>{newsData.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa', 
    },
    image: {
        width: '100%',
        height: 300,
    },
    contentContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: -20, 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        minHeight: 300,
    },
    title: {
        fontWeight: '800', 
        fontSize: 26,
        color: '#1a1a1a',
        lineHeight: 32,
        marginBottom: 10,
    },
    separator: {
        height: 4,
        width: 40,
        backgroundColor: '#007AFF',
        borderRadius: 2,
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        lineHeight: 24, 
        color: '#4a4a4a',
        textAlign: 'justify',
    }
});