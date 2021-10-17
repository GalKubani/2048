import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import ScoreBar from '../components/ScoreBar'
import GameBox from '../components/GameBox'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const GameScreen = ({ }) => {
    const [currentScore, setCurrentScore] = useState(0)
    const [highScore, setHighScore] = useState()

    useEffect(() => {
        const getHighScore = async () => {
            let res = await useAsyncStorage("high-score").getItem()
            setHighScore(res * 1 || 0)
        }
        getHighScore()
    }, [highScore])
    return (
        <View style={styles.screen}>
            <StatusBar style="auto" />
            <View style={styles.scorebarContainer}>
                <ScoreBar currentScore={currentScore} highScore={highScore} />
            </View>
            <View style={styles.gameboxContainer}>
                <GameBox updateCurrentScore={async (addedScore) => {
                    if (currentScore + addedScore > highScore) {
                        let res = await useAsyncStorage("high-score").setItem((currentScore + addedScore) + "")
                        setHighScore(res)
                    }
                    setCurrentScore(currentScore + addedScore)
                }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#bbada0',
    },
    scorebarContainer: {
        marginTop: 100,
        width: '80%',
        backgroundColor: '#ccc'
    },
    gameboxContainer: {
        marginTop: 60,
        width: '90%',
        height: Dimensions.get('window').width * 0.90,
    }
});

export default GameScreen