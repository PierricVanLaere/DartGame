import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from "../constants/styles"

export default function Index() {

    const games = ["Fléchettes", "Pétanque"]
    const router = useRouter();

    const start = (game : string) => {
        switch (game) {
            case "Fléchettes":
                router.push('/dart');
                break;
            case "Pétanque":
                router.push('/petanque');
                break;
            default:
                break;
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choisissez votre jeu !</Text>
            {games.map((game) => (
                <TouchableOpacity
                    key={game}
                    style={styles.variantButton} onPress={() => {
                        start(game)
                    }}>
                    <Text style={styles.variantText}>{game}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

