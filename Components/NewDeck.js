import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { saveDeckTitle } from '../API/FlashcardsAPI';
import { Text, Button, FormInput } from 'react-native-elements'

const style = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    submitButtonStyle: {
        marginTop: 15,
    }
})


export class NewDeck extends Component {
    state = {
        title: '',
    };

    handleSubmitPress = () => {
        saveDeckTitle(this.state.title).then(() => {this.props.navigation.navigate('DecksList')});
    }

    render() {
        return (
            <View style={style.inputContainer}>
                <Text h1>What is the title of your new deck?</Text>
                <View style={style.inputBoxContainerStyle}>
                    <FormInput
                        placeholder={'Deck Title'}
                        onChangeText={(title) => this.setState({ title: title })}
                    />
                </View>
                <Button
                    buttonStyle={style.submitButtonStyle}
                    onPress={this.handleSubmitPress}
                    title='Submit'
                    borderRadius={10}
                    backgroundColor="green"
                />
            </View>
        );
    }
}
