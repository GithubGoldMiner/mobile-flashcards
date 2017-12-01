import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Dimensions,TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { addCardToDeck } from '../API/FlashcardsAPI';
import { DeckDetail } from './DeckDetail';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { createCard } from '../actions/index';
import { connect } from 'react-redux';

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputBoxStyle: {
        width: Dimensions.get('window').width * 0.8,
    },
    
    addCardStyle: {
        marginTop: 15,
    }
})

export class AddCardToDeck extends Component {
    state = { 
        question: '',
        answer: '',
    };

    handleAddCard = () => {
        this.props.createCardToDeck(this.props.navigation.state.params.id, {
            question: this.state.question, 
            answer: this.state.answer
        });
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={style.container}>
                <View>
                    <FormInput
                        placeholder={'Question'}
                        onChangeText={(question) => this.setState({question: question})}
                    />
                </View>
                <View>
                    <FormInput
                        placeholder={'Answer'}
                        onChangeText={(answer) => this.setState({answer: answer})}
                    />
                </View>
                <Button 
                    buttonStyle={style.addCardStyle}
                    onPress={this.handleAddCard}
                    title='Add Card'
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
        createCardToDeck: (id, card) => {
            dispatch(createCard(id, card));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardToDeck);