import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Decks from './Components/Decks';
import DeckDetail from './Components/DeckDetail';
import NewDeck from './Components/NewDeck';
import { MyStatusBar } from './Components/MyStatusBar';
import AddCardToDeck from './Components/AddCardToDeck';
import Quiz from './Components/Quiz';
import Result from './Components/Result';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers/index';
import { Provider } from 'react-redux';
import { setLocalNotification } from './API/FlashcardsAPI';

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
    },
    Quiz: {
        screen: Quiz,
        path: 'quiz/:index',
    },
    Result: {
        screen: Result,
        path: 'result'
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

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <MyStatusBar />
                    <Tabs />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
