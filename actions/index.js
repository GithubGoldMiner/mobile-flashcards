import { getDecks, saveDeckTitle, getDeck, addCardToDeck } from '../API/FlashcardsAPI';

const GET_DECKS_START = 'GET_DECKS_START';
const GET_DECKS_FINISHED = 'GET_DECKS_FINISHED';

const CREATE_NEW_DECK_START = 'CREATE_NEW_DECK_START';
const CREATE_NEW_DECK_FINISHED = 'CREATE_NEW_DECK_FINISHED';

const GET_DECK_DETAIL_START = 'GET_DECK_DETAIL_START';
const GET_DECK_DETAIL_FINISHED = 'GET_DECK_DETAIL_FINISHED';  

const ADD_CARD_TO_DECK_START = "ADD_CARD_TO_DECK_START";
const ADD_CARD_TO_DECK_FINISHED = "ADD_CARD_TO_DECK_FINISHED";

const getDeckStart = () => {
    return {
        type: GET_DECKS_START,
    }
}

const getDeckFinished = (decks) => {
    return {
        type: GET_DECKS_FINISHED,
        decks,
    }
}

export const fetchDecks = () => {
    return (dispatch) => {
        dispatch(getDeckStart())
        getDecks().then((res) => {
            const result = Object.keys(res).map((key) => {
                return {
                    ...res[key],
                    key: key,
                }
            });
            return result; 
        }).then((result) => {
            dispatch(getDeckFinished(result));
        });
    }
}

const createNewDeckStart = () => {
    return {
        type: CREATE_NEW_DECK_START,
    }
}

const createNewDeckFinished = (newDeck) => {
    return {
        type: CREATE_NEW_DECK_FINISHED,
        deck: newDeck,
    }
}

export const createNewDeck = (deckTitle, id) => {
    return (dispatch) => {
        dispatch(createNewDeckStart());
        saveDeckTitle(deckTitle, id).then((res) => {
            dispatch(createNewDeckFinished({...res, id: id, key: id}));
        });
    }
}

const getDeckDetailStart = () => {
    return {
        type: GET_DECK_DETAIL_START,
    }
}

const getDeckDetailFinished = (deckDetail) => {
    return {
        type: GET_DECK_DETAIL_FINISHED,
        deckDetail,
    }
}

export const fetchDeckDetail = (id) => {
    return (dispatch) => {
        dispatch(getDeckDetailStart())
        getDeck(id).then((result) => {
            dispatch(getDeckDetailFinished(result));
        });
    }
}

const addCardToDeckStart = () => {
    return {
        type: ADD_CARD_TO_DECK_START,
    }
}

const addCardToDeckFinished = (id, deck) => {
    return {
        type: ADD_CARD_TO_DECK_FINISHED,
        id,
        deck,
    }
}

export const createCard = (id, card) => {
    return (dispatch) => {
        dispatch(addCardToDeckStart())
        addCardToDeck(id, card).then((result) => {
            dispatch(addCardToDeckFinished(id, result));
        });
    }
}