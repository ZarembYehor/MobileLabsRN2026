import { StyleSheet, View } from "react-native";

export default function Picture() {
    return <View style={styles.picture}/>
}

const styles = StyleSheet.create({
    picture: {
        width: '40%', 
        height: 120, 
        backgroundColor: '#1A1A1A', 
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'white',
    }
})