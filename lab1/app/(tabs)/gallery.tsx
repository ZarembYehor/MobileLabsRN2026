import { ThemedText } from "@/components/themed-text";
import { FlatList, StyleSheet, View } from "react-native";
import Picture from "../components/picture";

export default function GalletyScreen() {
    const cellArray = Array(10).fill(null).map((_, i) => ({ id: i.toString() }));

    return (
        <FlatList
            data={cellArray}
            keyExtractor={(item) => item.id}
            numColumns={2} 
            ListHeaderComponent={
                <View style={styles.titleContainer}>
                    <ThemedText style={styles.text}>Галерея</ThemedText>
                </View>
            }
            renderItem={() => <Picture />}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper} 
        />
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 15,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-around', 
        marginBottom: 20,
    },
    titleContainer: {
        width: '100%'
    }
})