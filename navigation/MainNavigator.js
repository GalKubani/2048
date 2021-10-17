import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import GameScreen from '../screens/GameScreen';
const MainStackNavigator = createStackNavigator()

export const GameNavigator = () => {
    return (
        <NavigationContainer>
            <MainStackNavigator.Navigator screenOptions={{
                headerLeft: () => null
            }}>
                <MainStackNavigator.Screen name="Game Screen" component={GameScreen} />
            </MainStackNavigator.Navigator>
        </NavigationContainer>)
}