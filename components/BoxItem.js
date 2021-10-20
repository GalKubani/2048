import React, { useState, useRef } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

const BoxItem = ({ tile }) => {
    const [position, setPosition] = useState()
    let currentPosition, scaleValue = useRef(new Animated.Value(0)).current
    let animationStyle = {}
    const updatePosition = (e) => {
        if (!position) { setPosition({ ...e.nativeEvent.layout }) }
        else if (position.x !== e.nativeEvent.layout.x || position.y !== e.nativeEvent.layout.y) {
            setPosition({ ...e.nativeEvent.layout })
        }
    }
    if (position) { currentPosition = new Animated.ValueXY({ x: position.x, y: position.y }) }
    const animate = () => {
        const toValue = { x: currentPosition.x + position.width + 12, y: currentPosition.y + position.height + 10 }
        Animated.timing(currentPosition, {
            toValue,
            duration: 100,
            useNativeDriver: true
        }).start()
        if (tile.newTile) {
            animationStyle.transform.push({ scale: scaleValue })
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
    }
    if (currentPosition && tile.value !== 0) {
        animationStyle = {
            transform: [...currentPosition.getTranslateTransform()],
            zIndex: tile.value !== 0 ? 8 : 0,
        }
        animate()
    }
    return (
        <Animated.View onLayout={updatePosition} style={{ ...styles.tileInner, ...checkTileValue(tile.value), ...animationStyle }}>
            <Text style={{ ...styles.insideText }}>{tile.value !== 0 ? tile.value : ''}</Text>
        </Animated.View>
    );
}
const checkTileValue = (value) => {
    switch (value) {
        case 2: { return styles.tileInner2; }
        case 4: { return styles.tileInner4; }
        case 8: { return styles.tileInner8; }
        case 16: { return styles.tileInner16; }
        case 32: { return styles.tileInner32; }
        case 64: { return styles.tileInner64; }
        case 128: { return styles.tileInner128; }
        case 256: { return styles.tileInner256; }
        case 512: { return styles.tileInner512; }
        case 1028: { return styles.tileInner1024; }
        case 2048: { return styles.tileInner2048; }
    }
}
const styles = StyleSheet.create({
    tileInner: {
        width: '22%',
        marginBottom: 10,
        height: '22%',
        fontSize: 56,
        fontWeight: 'bold',
        color: '#776e65',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'rgba(238, 228, 218,0.3)'
    },
    insideText: {
        textAlign: 'center',
        lineHeight: 65,
    },
    tileInner2: { backgroundColor: '#eee4da' },
    tileInner4: { backgroundColor: '#ede0c8' },
    tileInner8: { backgroundColor: '#f2b179' },
    tileInner16: { backgroundColor: '#f59563' },
    tileInner32: { backgroundColor: '#f67c5f' },
    tileInner64: { backgroundColor: '#f65e3b' },
    tileInner128: {
        fontSize: 48,
        backgroundColor: '#edcf72'
    },
    tileInner256: {
        fontSize: 48,
        backgroundColor: '#edcc61'
    },
    tileInner512: {
        fontSize: 48,
        backgroundColor: '#edc850'
    },
    tileInner1024: {
        fontSize: 36,
        backgroundColor: '#edc53f'
    },
    tileInner2048: {
        fontSize: 36,
        backgroundColor: '#edc22e'
    }
});

export default BoxItem