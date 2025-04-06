import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, BackHandler, Alert } from 'react-native';
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
            initialTable[key] = [0, parseInt(variant), parseInt(variant)];
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
                initialTable[key] = [0, parseInt(variant), parseInt(variant)];
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
        setValidTurn(false)
    };

    const router = useRouter();
    const changeGame = () => {
        router.push({
            pathname: '/',
        });
    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Quitter", "Voulez-vous vraiment quitter la partie en cours ?", [
                {
                    text: "Annuler",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "Oui", onPress: () => router.push({
                        pathname: '/',
                    })}
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    const firstInputRef = useRef<TextInput>(null);
    const secondInputRef = useRef<TextInput>(null);
    const thirdInputRef = useRef<TextInput>(null);

    const [validTurn, setValidTurn] = useState(false)
    useEffect(() => {
        if (validTurn) {
            Alert.alert("Valider", "Voulez-vous valider le score de ce tour ?", [
                {
                    text: "Annuler",
                    onPress: () => setValidTurn(false),
                    style: "cancel"
                },
                {
                    text: "Oui",
                    onPress: handleNextTurn
                }
            ]);
        }
    }, [validTurn]);

    const handleNextTurn = () => {
        const firstNum = parseInt(first);
        const firstM = parseInt(firstMult);
        const secondNum = parseInt(second);
        const secondM = parseInt(secondMult);
        const thirdNum = parseInt(third);
        const thirdM = parseInt(thirdMult);

        if (!isNaN(firstNum) && !isNaN(secondNum) && !isNaN(thirdNum)) { // Score correct
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
                setValidTurn(false)
                firstInputRef.current!!.focus()
            } else if (updatedTable[currentPlayer][1] - score < 0){ // Score trop élevé
                setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % size);
                updatedTable[currentPlayer][0] = 0;
                updatedTable[currentPlayer][2] = updatedTable[currentPlayer][1]
                setTable(updatedTable);
                onChangeFirst('');
                onChangeSecond('');
                onChangeThird('');
                setTooHigh(true);
                setError(false);
                setFirstMult('1')
                setSecondMult('1')
                setThirdMult('1')
                setValidTurn(false)
            } else { // Partie finie
                updatedTable[currentPlayer][0] = score;
                updatedTable[currentPlayer][1] -= score;
                setTable(updatedTable);
                setIsFinish(true);
                setTooHigh(false);
                setError(false);
            }
        } else { // Erreur de saisie
            setTooHigh(false);
            setError(true);
            setFirstMult('1')
            setSecondMult('1')
            setThirdMult('1')
            setValidTurn(false)
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
    const red = ['20','18','13','10','2','3','7','8','14','12']
    const green = ['1','4','6','15','17','19','16','11','9','5']
    const [temporaryScore, setTemporaryScore] = useState(table[currentPlayer][1])

    useEffect(() => {
        setTemporaryScore(table[currentPlayer][1])
    }, [currentPlayer])

    useEffect(() => {
        const updatedTable = { ...table };
        updatedTable[currentPlayer][2] = updatedTable[currentPlayer][1]
        if (first != ''){
            updatedTable[currentPlayer][2] = (temporaryScore-Number(first)*Number(firstMult))
        }
        if (second != '') {
            updatedTable[currentPlayer][2] = (updatedTable[currentPlayer][2] - Number(second) * Number(secondMult))
        }
        if (third != '') {
            updatedTable[currentPlayer][2] = (updatedTable[currentPlayer][2] - Number(third) * Number(thirdMult))
        }
        setTable(updatedTable);
    }, [first, firstMult, second, secondMult, third, thirdMult])

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
                        ref={firstInputRef}
                        style={styles.scoreInput}
                        onChangeText={(text) => {
                            if (validValues.has(text) || text == '') {
                                onChangeFirst(text);
                            }
                        }}
                        value={first}
                        keyboardType="numeric"
                        onSubmitEditing={() => secondInputRef.current!!.focus()}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            disabled={first === '50' || first === '25' || first === ''}
                            style={[
                                styles.button,
                                red.includes(first) ? styles.buttonXRed : green.includes(first) ? styles.buttonXGreen : styles.buttonXBlack,
                                firstMult === '2' && first != '' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setFirstMult(firstMult === '2' ? '1' : '2');
                            }}
                        >
                            <Text style={styles.buttonText}>X2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={first === '50' || first === '25' || first === ''}
                            style={[
                                styles.button,
                                red.includes(first) ? styles.buttonXRed : green.includes(first) ? styles.buttonXGreen : styles.buttonXBlack,
                                firstMult === '3' && first != '' && styles.selectedButton,
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
                        ref={secondInputRef}
                        style={styles.scoreInput}
                        onChangeText={(text) => {
                            if (validValues.has(text) || text == '') {
                                onChangeSecond(text);
                            }
                        }}
                        value={second}
                        keyboardType="numeric"
                        onSubmitEditing={() => thirdInputRef.current!!.focus()}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            disabled={second === '50' || second === '25' || second === ''}
                            style={[
                                styles.button,
                                red.includes(second) ? styles.buttonXRed : green.includes(second) ? styles.buttonXGreen : styles.buttonXBlack,
                                secondMult === '2' && second!= '' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setSecondMult(secondMult === '2' ? '1' : '2');
                            }}
                        >
                            <Text style={styles.buttonText}>X2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={second === '50' || second === '25' || second === ''}
                            style={[
                                styles.button,
                                red.includes(second) ? styles.buttonXRed : green.includes(second) ? styles.buttonXGreen : styles.buttonXBlack,
                                secondMult === '3' && second != '' && styles.selectedButton,
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
                        ref={thirdInputRef}
                        style={styles.scoreInput}
                        onChangeText={(text) => {
                            if (validValues.has(text) || text == '') {
                                onChangeThird(text);
                            }
                        }}
                        value={third}
                        keyboardType="numeric"
                        onSubmitEditing={() => firstInputRef.current!!.focus()}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            disabled={third === '50' || third === '25' || third === ''}
                            style={[
                                styles.button,
                                red.includes(third) ? styles.buttonXRed : green.includes(third) ? styles.buttonXGreen : styles.buttonXBlack,
                                thirdMult === '2' && third != '' && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setThirdMult(thirdMult === '2' ? '1' : '2');
                            }}
                        >
                            <Text style={styles.buttonText}>X2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={third === '50' || third === '25' || third === ''}
                            style={[
                                styles.button,
                                red.includes(third) ? styles.buttonXRed : green.includes(third) ? styles.buttonXGreen : styles.buttonXBlack,
                                thirdMult === '3' && third != '' && styles.selectedButton,
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

            <TouchableOpacity style={styles.validateButton} onPress={() => setValidTurn(true)} disabled = {isFinish}>
                <Text style={styles.validateButtonText}>Valider le tour</Text>
            </TouchableOpacity>

            {error && (
                <Text style={styles.errorText}>Les 3 champs doivent être remplis !</Text>
            )}
            {tooHigh && (
                <Text style={styles.errorText}>Score trop élevé !</Text>
            )}
            <Scores table={table} current={currentPlayer}/>
            {isFinish && (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                        <Text style={styles.restartButtonText}>Redémarrer le jeu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.restartButton} onPress={changeGame}>
                        <Text style={styles.restartButtonText}>Changer de jeu</Text>
                    </TouchableOpacity>
                </View>

            )}
        </View>
    );
}

function Scores({ table, current}: { table: { [key: string]: number[] }, current: string }) {
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
                            {player}: {`Dernier tour: ${scores[0]} | Restant : ${scores[2]},`}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}