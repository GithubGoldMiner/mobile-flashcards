import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck } from '../API/FlashcardsAPI';
import { StackNavigator } from 'react-navigation';
import { Text, Badge, Button } from 'react-native-elements'

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonStyle: {
        marginTop: 15,
    }
})

export class DeckDetail extends Component {
    state = {
        deck: {},
    }
    componentDidMount() {
        getDeck(this.props.navigation.state.params.id).then((result) => {
            console.log(result);
            this.setState({
                deck: result,
            });
        })
    }

    handleStartQuizPress = () => {
        console.log('StartQuiz Pressed');
    }

    render() {
        return (
            <View
                style={style.container}>
                <Text h1>
                    {this.state.deck.title}
                </Text>
                {   
                    this.state.deck.questions
                    ? <Badge
                        containerStyle={{ backgroundColor: 'violet'}}
                        value={this.state.deck.questions.length + ' Cards'}
                    />
                    : null
                }
                <Button 
                    buttonStyle={style.buttonStyle}
                    onPress={() => this.props.navigation.navigate('AddCardToDeck', { id: this.props.navigation.state.params.id })}
                    title='Add Card'
                    borderRadius={10}
                    backgroundColor="blue"
                />
                <Button 
                    buttonStyle={style.buttonStyle}
                    onPress={this.handleStartQuizPress}
                    title='Start Quiz'
                    borderRadius={10}
                    backgroundColor="green"
                />
                <Button 
                    buttonStyle={style.buttonStyle}
                    onPress={() => this.props.navigation.navigate('Decks')}
                    title='Cancel'
                    borderRadius={10}
                    backgroundColor="red"
                />
            </View>
        );
    }
}