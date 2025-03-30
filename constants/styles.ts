import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    listContainer: {
        paddingVertical: 20,
    },
    variantButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    variantButtonSelected: {
        backgroundColor: '#0056b3',
        borderWidth: 2,
        borderColor: '#ffd700',
    },
    variantText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    variantTextSelected: {
        color: '#ffd700',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        width: 300,
        textAlign: 'center',
    },
    startButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    finishText: {
        color: 'green',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    currentPlayerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#555',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    validateButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    validateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    scoresContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    scoresTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 18,
        color: '#555',
        marginVertical: 5,
    },
    scoreInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%', // Changé pour prendre toute la largeur disponible
        textAlign: 'center',
        marginBottom: 10,
    },
    restartButton: {
        backgroundColor: '#ffc107',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    restartButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', // Changé pour prendre toute la largeur disponible
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 1, // Ajouté pour que les boutons prennent la même taille
        alignItems: 'center', // Centrer le texte
    },
    buttonX2: {
        backgroundColor: 'green',
    },
    buttonX3: {
        backgroundColor: 'red',
    },
    selectedButton: {
        borderColor: 'blue',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
