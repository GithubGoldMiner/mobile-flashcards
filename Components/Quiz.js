import React, { Component } from 'react';
import { Button, Text } from 'react-native-elements'
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    buttonStyle: {
        marginTop: 15,
        width: 240,
    }
})

class Quiz extends Component {
    state = {
        viewAnswer: false,
    }

    handleViewAnswerClicked = () => {
        this.setState((prevState) => {
            return {
                viewAnswer: !prevState.viewAnswer
            }
        })
    }

    render() {
        return (
            <View style={style.container}>
                {this.state.viewAnswer === false
                    ? <Text h2>
                        {this.props.activeDeck.questions[this.props.navigation.state.params.index].question}
                    </Text>
                    : <Text h2>
                        {this.props.activeDeck.questions[this.props.navigation.state.params.index].answer}
                    </Text>
                }
                <Text h4>
                    {this.props.navigation.state.params.index + 1} / {this.props.activeDeck.questions.length} ({this.props.activeDeck.questions.length - this.props.navigation.state.params.index - 1} left)
                </Text>
                <Button
                    onPress={this.handleViewAnswerClicked}
                    buttonStyle={style.buttonStyle}
                    title={this.state.viewAnswer?'Show Question': 'Show Answer'}
                    backgroundColor="#428bca"
                    borderRadius={10} />
                <Button
                    onPress={() => {
                        if( this.props.navigation.state.params.index + 1 === this.props.activeDeck.questions.length){
                            this.props.navigation.navigate('Result', {id: this.props.navigation.state.params.id, total: this.props.activeDeck.questions.length, correct: this.props.navigation.state.params.correct + 1});
                        } else {
                            this.props.navigation.navigate('Quiz', {id: this.props.navigation.state.params.id, index: this.props.navigation.state.params.index + 1, correct: this.props.navigation.state.params.correct + 1 })}
                        }      
                    }
                    buttonStyle={style.buttonStyle}
                    title='Correct' 
                    backgroundColor="#5cb85c"
                    borderRadius={10} />
                <Button
                    onPress={() => {
                        if( this.props.navigation.state.params.index + 1 === this.props.activeDeck.questions.length){
                            this.props.navigation.navigate('Result', {id: this.props.navigation.state.params.id, total: this.props.activeDeck.questions.length, correct: this.props.navigation.state.params.correct});
                        } else {
                            this.props.navigation.navigate('Quiz', {id: this.props.navigation.state.params.id, index: this.props.navigation.state.params.index + 1, correct: this.props.navigation.state.params.correct })}
                        } 
                    }
                    buttonStyle={style.buttonStyle}
                    title='Incorrect' 
                    backgroundColor="#d9534f" 
                    borderRadius={10} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeDeck: state.activeDeck,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
