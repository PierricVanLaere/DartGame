import { useState } from "react";
import { useLocalSearchParams } from 'expo-router';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from "../constants/styles"

export default function Petanque(){
    const {num} = useLocalSearchParams<{num: string }>();
    const size = parseInt(num, 10);
    const [table, setTable] = useState(() => {
        const initialTable: { [key: string]: number[] } = {};
        for (let i = 1; i <= size; i++) {
            const key = `joueur ${i} `;
            initialTable[key] = [0];
        }
        return initialTable;
    });
    const playerList = Object.keys(table)
    const [error, setError] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [winnerTurn, setWinnerTurn] = useState ('')
    const [winner, setWinner] = useState('')
    const [turnScore, onChangeTurnScore] = useState('');
    const [errorPlayer, setErrorPlayer] = useState(false);

    const restartGame = () => {
        setTable(() => {
            const initialTable: { [key: string]: number[] } = {};
            for (let i = 1; i <= size; i++) {
                const key = `joueur ${i}`;
                initialTable[key] = [0, 13];
            }
            return initialTable;
        });
        setWinnerTurn('');
        setWinner('')
        setIsFinish(false);
    };

    const handleNextTurn = () => {
        if (winnerTurn == ''){
            setErrorPlayer(true)
        }else{
            const score = parseInt(turnScore);
            if (!isNaN(score)) {
                setError(false)
                setErrorPlayer(false)
                const updatedTable = { ...table };
                if (updatedTable[winnerTurn][0] + score < 13) {
                    updatedTable[winnerTurn][0] += score
                    setWinnerTurn('');
                    onChangeTurnScore('')
                } else {
                    setWinner(winnerTurn)
                    setIsFinish(true);
                }
            } else {
                setErrorPlayer(false)
                setError(true)
            }
        }
    }

    const validValues = new Set([
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13'
    ]);
    return (
        <View style={styles.container}>
            {isFinish && ( 
                <Text style={styles.finishText}>{`${winner} a gagné !`}</Text>
            )}
            <Text style={styles.title}>Le premier à 13 !</Text>
            <View style={styles.inputRow}>
                <View style={styles.container}>
                    <Text style={styles.text}>Nombre de points</Text>
                    <TextInput
                        style={styles.scoreInput}
                        onChangeText={(text) => {
                            if (validValues.has(text) || text == '') {
                                onChangeTurnScore(text);
                            }
                        }}
                        value={turnScore}
                        keyboardType="numeric"
                    />
                    {!isFinish && (
                        <View>
                            <Text style={styles.text}>Pour le joueur : </Text>
                            <View style={styles.buttonContainer}>
                                {playerList.map((player, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.playerButton,
                                            winnerTurn === player && styles.playerButtonSelected,
                                        ]}
                                        onPress={() => {
                                            if (winnerTurn == player) {
                                                setWinnerTurn('')
                                            } else {
                                                setWinnerTurn(player)
                                            }
                                        }}
                                    >
                                        <Text style={styles.playerButtonText}>{player}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.validateButton} disabled={isFinish} onPress={handleNextTurn}>
                <Text style={styles.validateButtonText}>Valider le tour</Text>
            </TouchableOpacity>

            {error && (
                <Text style={styles.errorText}>Aucun score saisie !</Text>
            )}
            {errorPlayer && (
                <Text style={styles.errorText}>Aucun joueur séléctionné !</Text>
            )}
            <Scores table={table}/>
            {isFinish && (
                <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                    <Text style={styles.restartButtonText}>Redémarrer le jeu</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

function Scores({ table }: { table: { [key: string]: number[] } }) {
    return (
        <View style={[styles.scoresContainer]}>
            <Text style={styles.scoresTitle}>Scores</Text>
            <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
                {Object.entries(table).map(([player, scores]) => (
                    <Text key={player} style={styles.scoreText}>
                        {player}: {`Score : ${scores[0]}`}
                    </Text>
                ))}
            </ScrollView>
        </View>
    );
}