import React from 'react';
import { FontAwesome } from '@expo/vector-icons';


const CustomButton = ({ buttonClick }) => {
    return (
        <FontAwesome.Button onPress={() => { buttonClick() }} size={28} name="refresh" backgroundColor='#ccc' >
        </FontAwesome.Button >
    );
};

export default CustomButton;
