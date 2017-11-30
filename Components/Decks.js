import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getDecks } from '../API/FlashcardsAPI';
import { StackNavigator } from 'react-navigation';
import { DeckDetail } from './DeckDetail';
import { Text, Badge } from 'react-native-elements'

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

export class Decks extends Component {
 
    static navigationOptions = {
        title: 'Decks',
    }
    
    state = {
        decks: [],
    }

    componentDidMount() {
        getDecks().then((res) => {
            const result = Object.keys(res).map((key) => {
                return {
                    ...res[key],
                    key: key,
                }
            });
            this.setState({
                decks: result,
            }); 
        });
    }

    render() {
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
                <FlatList 
                    data={this.state.decks}
                    renderItem={({item}) => 
                        <TouchableOpacity style={styles.container} onPress={() => { this.props.navigation.navigate('DeckDetail', {id: item.id})}}>
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


  
