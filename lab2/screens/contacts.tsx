import { SectionList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { CONTACTS } from "../components/contacts";

export default function Contacts() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <SectionList
                sections={CONTACTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listPadding}
                stickySectionHeadersEnabled={true} 
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5', 
    },
    listPadding: {
        paddingBottom: 20,
    },
    header: {
        backgroundColor: '#ffdbdb', 
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 15,
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#d32f2f',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#000000',
        marginHorizontal: 10,
    }
});