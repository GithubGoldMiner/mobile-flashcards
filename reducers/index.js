const initialState = {
    deckLists: [],
    activeDeck: {},
};

export const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'GET_DECKS_START':
            return state;
        case 'GET_DECKS_FINISHED':
            return {
                ...state,
                deckLists: action.decks,
            }
        case 'CREATE_NEW_DECK_START':
            return state;
        case 'CREATE_NEW_DECK_FINISHED':
            let tempList = state.deckLists.concat(action.deck);
            return {
                activeDeck: action.deck,
                deckLists: tempList,
            }
        case 'GET_DECK_DETAIL_START':
            return state;
        case 'GET_DECK_DETAIL_FINISHED':
            return {
                ...state,
                activeDeck: action.deckDetail,
            }
        case 'ADD_CARD_TO_DECK_START':
            return state;
        case 'ADD_CARD_TO_DECK_FINISHED':
            let copy = state.deckLists.map((deck) => {
                if(deck.id !== action.id){
                    return deck;
                } else {
                    return action.deck;
                }
            })
            return {
                deckLists: copy,
                activeDeck: action.deck,
            }
        default:
            return state;
    }
}