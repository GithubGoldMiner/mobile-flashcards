import { AsyncStorage } from 'react-native';
const uuidv1 = require('uuid/v1');

export const getDecks = () => {
    return AsyncStorage.getItem('FlashCards').then((results) => {
        if ( !results )
            return {};
        else {
            return JSON.parse(results);
        }
    });
}

export const saveDeckTitle = (title, id) => {
    return AsyncStorage.getItem('FlashCards').then((results) => {
        
        const data = !!results? JSON.parse(results): {};
        data[title] = {
            id: id,
            title: title,
            questions: [],
            key: id
        }
        AsyncStorage.mergeItem('FlashCards', JSON.stringify(data));
        return data[title];
    })
}

export const getDeck = (id) => {
    return AsyncStorage.getItem('FlashCards').then((results) => {
        const resultsCopy = JSON.parse(results);
        const keyArray = Object.keys(resultsCopy);
        const result = keyArray.filter((key) => {
            return resultsCopy[key].id === id;
        })
        return resultsCopy[result[0]];
    })
}

export const addCardToDeck = (id, card) => {
    return AsyncStorage.getItem('FlashCards').then((results) => {
        const result = JSON.parse(results);
        const keyArray = Object.keys(result);

        let activeDeck;
        keyArray.map((key) => {
            if (result[key].id === id) {
                result[key].questions.push(card);
                activeDeck = result[key];
            }
        });
        AsyncStorage.setItem('FlashCards', JSON.stringify(result));
        return activeDeck;
    })
}