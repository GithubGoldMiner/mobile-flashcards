import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck } from '../API/FlashcardsAPI';
import { StackNavigator } from 'react-navigation';
import { Text, Badge, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchDeckDetail } from '../actions/index'; 

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    buttonStyle: {
        marginTop: 15,
        width: 240
    }
})

class DeckDetail extends Component {

    componentDidMount() {
        this.props.getDeckDetail(this.props.navigation.state.params.id);
    }

    render() {
        console.log('render', this.props)
        return (
            <View style={style.container}>
                {
                    !this.props.activeDeck || Object.keys(this.props.activeDeck) === 0
                    ?null
                    :<View>
                        <Text h1>
                            {this.props.activeDeck.title}
                        </Text>
                        {   
                            this.props.activeDeck.questions
                            ? <Badge
                                containerStyle={{ backgroundColor: 'violet'}}
                                value={this.props.activeDeck.questions.length + ' Cards'}
                            />
                            : null
                        }
                        <Button 
                            buttonStyle={style.buttonStyle}
                            onPress={() => this.props.navigation.navigate('AddCardToDeck', { id: this.props.navigation.state.params.id })}
                            title='Create New Question'
                            borderRadius={10}
                            backgroundColor="blue"
                        />
                        <Button 
                            buttonStyle={style.buttonStyle}
                            disabled={!(this.props.activeDeck.questions && this.props.activeDeck.questions.length > 0)}
                            onPress={() => {this.props.navigation.navigate('Quiz', { id: this.props.navigation.state.params.id, index: 0, correct: 0})}}
                            title='Start a Quiz'
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
                }
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
        getDeckDetail: (id) => {
            dispatch(fetchDeckDetail(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);