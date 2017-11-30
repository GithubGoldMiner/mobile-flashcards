import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { Decks } from './Components/Decks';
import { DeckDetail } from './Components/DeckDetail';
import { NewDeck } from './Components/NewDeck';
import { MyStatusBar } from './Components/MyStatusBar';
import { AddCardToDeck } from './Components/AddCardToDeck';

const DeckStack = StackNavigator({
    Decks: {
        screen: Decks,
    },
    DeckDetail: {
        screen: DeckDetail,
        path: 'deckDetails/:id',
    },
    AddCardToDeck: {
        screen: AddCardToDeck,
        path: 'deckDetails/addCard/:id',
    }
}, {
    headerMode: 'none',
});

const Tabs = TabNavigator({
    DecksList: {
        screen: DeckStack,
        navigationOptions: {
            tabBarLabel: 'DecksList',
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck'
        }
    }
});

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <MyStatusBar />
                <Tabs />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
