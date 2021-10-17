import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BoxItem = ({ tile }) => {
    return (

        <View style={{ ...styles.tileInner, ...checkTileValue(tile.value) }}>
            <Text style={{ ...styles.insideText }}>{tile.value !== 0 ? tile.value : ''}</Text>
        </View>
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
    tileInner2: {
        backgroundColor: '#eee4da'
    },
    tileInner4: {
        backgroundColor: '#ede0c8'
    },
    tileInner8: {
        color: '#f9f6f2',
        backgroundColor: '#f2b179'
    },
    tileInner16: {
        color: '#f9f6f2',
        backgroundColor: '#f59563'
    },
    tileInner32: {
        color: '#f9f6f2',
        backgroundColor: '#f67c5f'
    },
    tileInner64: {
        color: '#f9f6f2',
        backgroundColor: '#f65e3b'
    },
    tileInner128: {
        fontSize: 48,
        color: '#f9f6f2',
        backgroundColor: '#edcf72'
    },
    tileInner256: {
        fontSize: 48,
        color: '#f9f6f2',
        backgroundColor: '#edcc61'
    },
    tileInner512: {
        fontSize: 48,
        color: '#f9f6f2',
        backgroundColor: '#edc850'
    },
    tileInner1024: {
        fontSize: 36,
        color: '#f9f6f2',
        backgroundColor: '#edc53f'
    },
    tileInner2048: {
        fontSize: 36,
        color: '#f9f6f2',
        backgroundColor: '#edc22e'
    }
});

export default BoxItem