import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { styles } from "../constants/styles"

export default function Name() {
    const router = useRouter();
    const { game, num, variant } = useLocalSearchParams<{ game: string; num: string, variant : string }>();
    const size = parseInt(num, 10);

    const [playerNames, setPlayerNames] = useState(Array(size).fill(''));


    const handleNameChange = ({ index, name }: { index: number; name: string }) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = name;
        setPlayerNames(newPlayerNames);
    };

    const handleSaveNames = () => {
        const finalNames = playerNames.map((name, i) => name === '' ? `Joueur ${i + 1}` : name);
        const jsonPlayers = JSON.stringify(finalNames)
        switch(game){
            case "petanque":{
                router.push({
                    pathname: '/petanque',
                    params: { jsonPlayers, num },
                });
            }
            break
            case "flechettes":{
                router.push({
                    pathname: '/game',
                    params: { jsonPlayers, num, variant },
                });
            }
            break
        }

        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Personnalisez les noms des joueurs</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {playerNames.map((name, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={(text) => handleNameChange({ index, name: text })}
                            placeholder={`Nom du joueur ${index + 1}`}
                        />
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveNames}>
                <Text style={styles.saveButtonText}>Sauvegarder les noms</Text>
            </TouchableOpacity>
        </View>
    );
}