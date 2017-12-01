import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { saveDeckTitle } from '../API/FlashcardsAPI';
import { Text, Button, FormInput } from 'react-native-elements'
import { connect } from 'react-redux';
import { createNewDeck } from '../actions/index';
const uuidv1 = require('uuid/v1');

const style = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    submitButtonStyle: {
        width: 240,
        marginTop: 15,
    }
})

class NewDeck extends Component {
    state = {
        title: '',
    };

    handleSubmitPress = () => {
        const id = uuidv1();
        Promise.all([this.props.createDeck(this.state.title, id)]).then(() => {this.props.navigation.navigate('DeckDetail', {id: id})});
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
                    title='Create Deck'
                    borderRadius={10}
                    backgroundColor="green"
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createDeck: (title, id) => {
            dispatch(createNewDeck(title, id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
