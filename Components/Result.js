import React, { Component } from 'react';
import { Button, Text } from 'react-native-elements'
import { View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    buttonStyle: {
        marginTop: 15,
        width: 240,
    }
})

export default class Result extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text h4>Your result (correct / total): </Text>
                <Text h4>{this.props.navigation.state.params.correct} / {this.props.navigation.state.params.total}</Text>
                <Button buttonStyle={style.buttonStyle} onPress={() => {this.props.navigation.navigate('Quiz', { id: this.props.navigation.state.params.id, index: 0, correct: 0})}} title="Restart Quiz" />
                <Button buttonStyle={style.buttonStyle} onPress={() => {this.props.navigation.navigate('DeckDetail', {id: this.props.navigation.state.params.id})}} title="Back to Deck" />
            </View>
        )
    }
}