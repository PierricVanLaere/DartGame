import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from "../constants/styles"

export default function Index() {

    const games = ["Fléchettes", "Pétanque"]
    const [isPetanqueSelected, setIsPetanqueSelected] = useState(false)
    const router = useRouter();

    const start = (game : string) => {
        switch (game) {
            case "Fléchettes":
                router.push('/dart');
                setIsPetanqueSelected(false)
                break;
            case "Pétanque":
                setIsPetanqueSelected(true)
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
            {isPetanqueSelected && (
                <PlayersNumber/>
            )}
        </View>
    );
}

function PlayersNumber(){
  const [number, onChangeNumber] = useState('');
  const router = useRouter();
  const [error, setError] = useState(false)

  const handleStartPress = () => {
    const game = "petanque"
    const num = parseInt(number);
    if (!isNaN(num) && num >= 1) {
      router.push({
        pathname: '/names',
        params: {game, num},
      });
    } else {
      setError(true);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Nombre de joueurs"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.startButtonText}>Lancer la partie</Text>
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>Le nombre de joueurs doit être positif</Text>
      )}
    </View>
  );
}