import { useLocalSearchParams } from 'expo-router';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { styles } from "../constants/styles"

export default function GameScreen() {
    const { variant, num } = useLocalSearchParams<{ variant: string; num: string }>();
    const size = parseInt(num, 10);
    const [table, setTable] = useState(() => {
        const initialTable: { [key: string]: number[] } = {};
        for (let i = 1; i <= size; i++) {
            const key = `joueur ${i}`;
            initialTable[key] = [0, parseInt(variant)];
        }
        return initialTable;
    });
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const currentPlayer = `joueur ${currentPlayerIndex + 1}`;
    const [error, setError] = useState(false);
    const [tooHigh, setTooHigh] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    const restartGame = () => {
        setTable(() => {
            const initialTable: { [key: string]: number[] } = {};
            for (let i = 1; i <= size; i++) {
                const key = `joueur ${i}`;
                initialTable[key] = [0, parseInt(variant)];
            }
            return initialTable;
        });
        setCurrentPlayerIndex(0);
        setIsFinish(false);
        onChangeFirst('');
        onChangeSecond('');
        onChangeThird('');
    };

    const handleNextTurn = () => {
        const firstNum = parseInt(first);
        const secondNum = parseInt(second);
        const thirdNum = parseInt(third);

        if (!isNaN(firstNum) && !isNaN(secondNum) && !isNaN(thirdNum)) {
            const score = firstNum + secondNum + thirdNum;
            const updatedTable = { ...table };
            if (updatedTable[currentPlayer][0] + score < parseInt(variant)){
                updatedTable[currentPlayer][0] += score;
                updatedTable[currentPlayer][1] -= score;
                setTable(updatedTable);
                setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % size);
                onChangeFirst('');
                onChangeSecond('');
                onChangeThird('');
                setError(false);
                setTooHigh(false);
            } else if (updatedTable[currentPlayer][0] + score > parseInt(variant)){
                setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % size);
                onChangeFirst('');
                onChangeSecond('');
                onChangeThird('');
                setTooHigh(true);
                setError(false);
            } else {
                setIsFinish(true);
                setTooHigh(false);
                setError(false);
            }
        } else {
            setTooHigh(false);
            setError(true);
        }
    };

    const [first, onChangeFirst] = useState('');
    const [second, onChangeSecond] = useState('');
    const [third, onChangeThird] = useState('');

    return (
        <View style={styles.container}>
            {isFinish && (
                <Text style={styles.finishText}>{`${currentPlayer} a gagné !`}</Text>
            )}
            <Text style={styles.title}>Mode de jeu : {variant}</Text>
            <Text style={styles.currentPlayerText}>Tour du joueur : {currentPlayer}</Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.scoreInput}
                    onChangeText={onChangeFirst}
                    value={first}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.scoreInput}
                    onChangeText={onChangeSecond}
                    value={second}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.scoreInput}
                    onChangeText={onChangeThird}
                    value={third}
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity style={styles.validateButton} onPress={handleNextTurn} disabled = {isFinish}>
                <Text style={styles.validateButtonText}>Valider le tour</Text>
                
            </TouchableOpacity>
            {error && (
                <Text style={styles.errorText}>Merci de ne rentrer que des nombres !</Text>
            )}
            {tooHigh && (
                <Text style={styles.errorText}>Score trop élevé !</Text>
            )}
            <View style={styles.scoresContainer}>
                <Text style={styles.scoresTitle}>Scores</Text>
                {Object.entries(table).map(([player, scores]) => (
                    <Text key={player} style={styles.scoreText}>
                        {player}: {`Total: ${scores[0]} | Restant : ${scores[1]}`}
                    </Text>
                ))}
            </View>
            {isFinish && (
                <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                    <Text style={styles.restartButtonText}>Redémarrer le jeu</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

