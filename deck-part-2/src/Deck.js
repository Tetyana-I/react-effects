// This component creates a new deck, shows a button that let us draw a card from the deck; renders a *Card* component. 

import './Deck.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Card from './Card';


function Deck () {
    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState({});
    const [cardsAreDrawing, setCardsAreDrawing] = useState(false); // true - can start fetching cards, false - can stop fetching
    const timerId = useRef();
    const remaining = useRef();
    
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

    // function toggle state of fetching/not fetching card
   function toggleBtn() {
        setCardsAreDrawing(cardsAreDrawing => !cardsAreDrawing)
    };
    
    // function allows to fetch cards from the deck (one card per second)
    useEffect (function fetchingCardPerSecond() {
        if (cardsAreDrawing) {
                timerId.current = setInterval(() => {
                    async function fetchCard() {
                        try {
                            console.log("Cards left:", remaining.current);
                            if (remaining.current === 0) {
                                alert('Error: no cards remaining!');
                                console.log("Unmount ID timer", timerId.current);
                                clearInterval(timerId.current);
                            }
                            else {
                                const cardResult = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                                const cardData = cardResult.data;
                                setCard(cardData.cards[0]);
                                remaining.current = cardData.remaining;
                            };
                        }
                        catch(e) {
                            console.log("Fetching Problem", e);
                            console.log("Unmount ID timer", timerId.current);
                            clearInterval(timerId.current);
                        }
                    };
                    fetchCard(); 
                }, 1000);
        } 
        else {
            console.log("Unmount ID timer", timerId.current);
            clearInterval(timerId.current);
        }
    }, [cardsAreDrawing]);

    return (
        <div>
           <button className="Deck-btn" onClick={ toggleBtn }>
               {cardsAreDrawing ? "Stop drawing" : "Start drawing!"}
            </button>
           <Card image = { card.image } />
        </div>
    )
}

export default Deck;