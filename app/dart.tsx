import { useState } from "react";
import { useRouter } from 'expo-router';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {styles} from "../constants/styles"

export default function Dart() {
  const variants = ["301", "501", "1001"];
  const [variantSelected, setVariantSelected] = useState('')
  const [isGameSelected, setIsGameSelected] = useState(false)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre mode de jeu !</Text>
      {variants.map((variant) => (
        <TouchableOpacity
          key={variant}
          style={[
            styles.variantButton,
            variantSelected === variant && styles.variantButtonSelected,
          ]}          onPress={() => {
            setIsGameSelected(true)
            setVariantSelected(variant)
          }}>
          <Text style={styles.variantText}>{variant}</Text>
        </TouchableOpacity>
      ))}
      {isGameSelected && (
        <PlayersNumber variant={variantSelected} />
      )}
    </View>
  );
}

function PlayersNumber({variant} : {variant: string}){
  const [number, onChangeNumber] = useState('');
  const router = useRouter();
  const [error, setError] = useState(false)

  const handleStartPress = () => {
    const num = parseInt(number);
    if (!isNaN(num) && num >= 1) {
      router.push({
        pathname: '/game',
        params: { variant, num },
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
