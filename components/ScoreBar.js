import React, { cloneElement, useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { resetBoard } from '../actions/boardActions';
import { BoardContext } from '../context/boardContext';
import CustomButton from './CustomButton';


const ScoreBar = ({ currentScore, highScore }) => {
    const { boardDispatch } = useContext(BoardContext)

    return (
        <View style={styles.scoreBar}>
            <View style={styles.scoreBox}>
                <Text style={styles.text}>High Score : {highScore}</Text>
            </View>
            <View style={styles.scoreBox}>
                <Text style={styles.text}>Current Score : {currentScore}</Text>
            </View>
            <View style={styles.buttonWrap}>
                <CustomButton buttonClick={() => {
                    boardDispatch(resetBoard())
                }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    scoreBar: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%',
        padding: 5
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