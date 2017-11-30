import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

export const MyStatusBar = () => (
    <View 
        style={{
            height: Constants.statusBarHeight,
        }}
    >
        <StatusBar 
            translucent 
            barStyle='light-content' 
        />
    </View>
)