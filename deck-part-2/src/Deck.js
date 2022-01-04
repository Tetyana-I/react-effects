// This component creates a new deck, shows a button that let us draw a card from the deck; renders a *Card* component. 

import './Deck.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Card from './Card';


function Deck () {
    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState({});
    const [cardsAvailable, setCardsAvailable] = useState(true); // true - can start fetching cards, false - can stop fetching
    const timerId = useRef();
    
    // runs only after the first page load: get a new deck of card and save its id in state
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

    // function allows to start/stop fetching cards from the deck (one card per second)
    function toggleBtn() {
        setCardsAvailable(cardsAvailable => !cardsAvailable);
        if (cardsAvailable) {
            timerId.current = setInterval(() => {
                async function fetchCard() {
                    try {
                        // why I cannot see alert message and card state ???
                        console.log("Left:", card.left_cards);
                        if (card.left_cards === 0) {
                            alert('Error: no cards remaining!');
                        }
                        else {
                            const cardResult = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                            const cardData = cardResult.data.cards[0];
                            setCard({
                                image: cardData.image,
                                value: cardData.value,
                                suit: cardData.suit,
                                left_cards: cardResult.data.remaining
                            })};
                    }
                    catch(e) {
                        console.log("Fetching Problem", e);
                        console.log("Unmount ID timer", timerId.current);
                        clearInterval(timerId.current);
                    }
                };
                fetchCard(); 
            }, 1000);
        } else {
            console.log("Unmount ID timer", timerId.current);
            clearInterval(timerId.current);
        }

    }

    return (
        <div>
           <button className="Deck-btn" onClick={ toggleBtn }>
               {cardsAvailable ? "Start drawing!" : "Stop drawing"}
            </button>
           <Card image = { card.image } />
        </div>
    )
}

export default Deck;