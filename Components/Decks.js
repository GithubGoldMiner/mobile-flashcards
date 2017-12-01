import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { getDecks } from '../API/FlashcardsAPI';
import { StackNavigator } from 'react-navigation';
import { DeckDetail } from './DeckDetail';
import { Text, Badge } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchDecks } from "../actions/index";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const styles = StyleSheet.create({
    container: {
        height: 200,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
    info: {
        fontSize: 16,
        color: 'gray',
    }
})

class Decks extends Component {
 
    static navigationOptions = {
        title: 'Decks',
    }
    
    state = {
        decks: [],
        animatedValue: new Animated.Value(0)
    }

    componentDidMount() {
        this.props.getDeckList();
    }

    render() {
        let translateY = this.state.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: [0, -180],
			extrapolate: 'clamp',
		});
        if (Object.keys(this.state.decks) === 0){
            return (
                <View>
                    <Text>
                        No Deck is found. You can add yours now.
                    </Text>
                </View>
            )
        } else {
            return (
                <AnimatedFlatList 
                    data={this.props.decks}
                    renderItem={({item}) => 
                        <TouchableOpacity key={item.id} style={styles.container} onPress={() => { this.props.navigation.navigate('DeckDetail', {id: item.id})}}>
                            <Text h1>{item.title}</Text>
                            <Badge
                                containerStyle={{ backgroundColor: 'violet'}}
                                value={item.questions.length + ' Cards'}
                            />
                        </TouchableOpacity>
                    }
                />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state.deckLists,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDeckList: () => {
            dispatch(fetchDecks());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
