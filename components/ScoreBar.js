import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { resetBoard } from '../actions/boardActions';
import { BoardContext } from '../context/boardContext';


const ScoreBar = ({ currentScore, highScore }) => {
    const { boardDispatch } = useContext(BoardContext)

    return (
        <View style={styles.screen}>
            <View style={styles.scoreBox}>
                <Text style={styles.text}>High Score : {highScore}</Text>
            </View>
            <View style={styles.scoreBox}>
                <Text style={styles.text}>Current Score : {currentScore}</Text>
            </View>
            <Button title="Reset" onPress={() => {
                boardDispatch(resetBoard())
            }} />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%'
    },
    scoreBox: {
        backgroundColor: '#ccc',
        width: 80,
        height: 40,
        margin: 20,
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
});

export default ScoreBar