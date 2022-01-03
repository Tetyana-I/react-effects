// This component creates a new deck, shows a button that let us draw a card from the deck; renders a *Card* component. 

import './Deck.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card';


function Deck () {
    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState({});
    
    // function to get a card from the deck and save data of the new card in the state that force to rerender a card-image
    // if 0 cards left in the deck, shows an alert message

    async function fetchCard() {
        try {
            const cardResult = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const cardData = cardResult.data.cards[0];
            if (card.left_cards === 0) {
                alert('Error: no cards remaining!')
            }
            setCard({
                image: cardData.image,
                value: cardData.value,
                suit: cardData.suit,
                left_cards: cardResult.data.remaining
             });
        }
        catch(e) {
            console.log("Fetching Problem", e);
        }
    }

    useEffect(function fetchDeckOnAfterFirstRender() {
        async function fetchDeck() {
            try {
                const deckResult = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                setDeckId(deckResult.data.deck_id);
            }
            catch(e) {
                console.log("Fetching Problem", e);
            }
        }
        fetchDeck();
    }, []);
    
    return (
        <div>
           <button className="Deck-btn" onClick={ fetchCard } >Get a card !</button>
           <Card image = { card.image } />
        </div>
    )
}

export default Deck;