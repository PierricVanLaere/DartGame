import { useLocalSearchParams } from 'expo-router';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from "react";
import { styles } from "../constants/styles"

export default function GameScreen() {
    const { jsonPlayers, num, variant } = useLocalSearchParams < { jsonPlayers: string, num: string, variant: string}>();
    const size = parseInt(num, 10)
    const playersNames = JSON.parse(jsonPlayers as string)
    const [table, setTable] = useState(() => {
        const initialTable: { [key: string]: number[] } = {};
        for (let i = 0; i < size; i++) {
            const key = playersNames[i];
            initialTable[key] = [0, parseInt(variant)];
        }
        return initialTable;
    });
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const currentPlayer = playersNames[currentPlayerIndex]
    const [error, setError] = useState(false);
    const [tooHigh, setTooHigh] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    const restartGame = () => {
        setTable(() => {
            const initialTable: { [key: string]: number[] } = {};
            for (let i = 0; i < size; i++) {
                const key = playersNames[i];
                initialTable[key] = [0, parseInt(variant)];
            }
            return initialTable;
        });
        setCurrentPlayerIndex(0);
        setIsFinish(false);
        onChangeFirst('');
        onChangeSecond('');
        onChangeThird('');
        setFirstMult('1')
        setSecondMult('1')
        setThirdMult('1')
    };

    const handleNextTurn = () => {
        const firstNum = parseInt(first);
        const firstM = parseInt(firstMult);
        const secondNum = parseInt(second);
        const secondM = parseInt(secondMult);
        const thirdNum = parseInt(third);
        const thirdM = parseInt(thirdMult);

        if (!isNaN(firstNum) && !isNaN(secondNum) && !isNaN(thirdNum)) {
            const score = (firstNum * firstM) + (secondNum * secondM) + (thirdNum * thirdM);
            const updatedTable = { ...table };
            if (updatedTable[currentPlayer][1] - score > 0 ){
                updatedTable[currentPlayer][0] = score;
                updatedTable[currentPlayer][1] -= score;
                setTable(updatedTable);
                setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % size);
                onChangeFirst('');
                onChangeSecond('');
                onChangeThird('');
                setError(false);
                setTooHigh(false);
                setFirstMult('1')
                setSecondMult('1')
                setThirdMult('1')
            } else if (updatedTable[currentPlayer][1] - score < 0){
                setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % size);
                updatedTable[currentPlayer][0] = 0;
                onChangeFirst('');
                onChangeSecond('');
                onChangeThird('');
                setTooHigh(true);
                setError(false);
                setFirstMult('1')
                setSecondMult('1')
                setThirdMult('1')
            } else {
                updatedTable[currentPlayer][0] = score;
                updatedTable[currentPlayer][1] -= score;
                setIsFinish(true);
                setTooHigh(false);
                setError(false);
            }
        } else {
            setTooHigh(false);
            setError(true);
            setFirstMult('1')
            setSecondMult('1')
            setThirdMult('1')
        }
    };

    const [first, onChangeFirst] = useState('');
    const [firstMult, setFirstMult] = useState('1')
    const [second, onChangeSecond] = useState('');
    const [secondMult, setSecondMult] = useState('1')
    const [third, onChangeThird] = useState('');
    const [thirdMult, setThirdMult] = useState('1')
    const validValues = new Set([
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '25', '50'
    ]);

    return (
        <View style={styles.container}>
            {isFinish && (
                <Text style={styles.finishText}>{`${currentPlayer} a gagné !`}</Text>
            )}
            <Text style={styles.title}>Mode de jeu : {variant}</Text>
            <Text style={styles.currentPlayerText}>Tour du joueur : {currentPlayer}</Text>
            <View style={styles.inputRow}>
                <View style={{ width: '33%' }}>
                    <TextInput
                        style={styles.scoreInput}
                        onChangeText={(text) => {
                            if (validValues.has(text) || text == '') {
                                onChangeFirst(text);
                            }
                        }}
                        value={first}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonX2,
                                firstMult === '2' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setFirstMult(firstMult === '2' ? '1' : '2');
                            }}
                        >
                            <Text style={styles.buttonText}>X2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonX3,
                                firstMult === '3' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setFirstMult(firstMult === '3' ? '1' : '3');
                            }}
                        >
                            <Text style={styles.buttonText}>X3</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={{ width: '33%' }}>
                    <TextInput
                        style={styles.scoreInput}
                        onChangeText={(text) => {
                            if (validValues.has(text) || text == '') {
                                onChangeSecond(text);
                            }
                        }}
                        value={second}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonX2,
                                secondMult === '2' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setSecondMult(secondMult === '2' ? '1' : '2');
                            }}
                        >
                            <Text style={styles.buttonText}>X2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonX3,
                                secondMult === '3' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setSecondMult(secondMult === '3' ? '1' : '3');
                            }}
                        >
                            <Text style={styles.buttonText}>X3</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={{ width: '33%' }}>
                    <TextInput
                        style={styles.scoreInput}
                        onChangeText={(text) => {
                            if (validValues.has(text) || text == '') {
                                onChangeThird(text);
                            }
                        }}
                        value={third}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonX2,
                                thirdMult === '2' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setThirdMult(thirdMult === '2' ? '1' : '2');
                            }}
                        >
                            <Text style={styles.buttonText}>X2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonX3,
                                thirdMult === '3' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setThirdMult(thirdMult === '3' ? '1' : '3');
                            }}
                        >
                            <Text style={styles.buttonText}>X3</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>

            <TouchableOpacity style={styles.validateButton} onPress={handleNextTurn} disabled = {isFinish}>
                <Text style={styles.validateButtonText}>Valider le tour</Text>
            </TouchableOpacity>

            {error && (
                <Text style={styles.errorText}>Les 3 champs doivent être remplis !</Text>
            )}
            {tooHigh && (
                <Text style={styles.errorText}>Score trop élevé !</Text>
            )}
            <Scores table={table} current = {currentPlayer}/>
            {isFinish && (
                <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                    <Text style={styles.restartButtonText}>Redémarrer le jeu</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

function Scores({ table, current }: { table: { [key: string]: number[] }, current: string }) {
    return (
        <View style={styles.scoresContainer}>
            <Text style={styles.scoresTitle}>Scores</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {Object.entries(table).map(([player, scores]) => (
                    <View
                        key={player}
                        style={[
                            styles.scoreRow,
                            player === current && styles.currentPlayerRow,
                        ]}
                    >
                        <Text style={styles.scoreText}>
                            {player}: {`Dernier tour: ${scores[0]} | Restant : ${scores[1]}`}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}