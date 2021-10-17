import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native'
const StartScreen = ({ navigation }) => {

    return (
        <View style={styles.screen}>
            <StatusBar style="auto" />
            <Button title="Start a game" onPress={() => {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Game Screen'
                    })
                )
            }} />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default StartScreen