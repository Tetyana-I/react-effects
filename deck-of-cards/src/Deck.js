import './GetCardButton.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GetCardButton from './GetCardButton';
import Card from './Card';


function Deck () {
    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState({});

    async function fetchCard() {
        console.log("new card!");
        try {
            const cardResult = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const cardData = cardResult.data.cards[0];
            console.log("Data", cardData);
            setCard({
               image: cardData.image,
               value: cardData.value,
               suit: cardData.suit
            });
            console.log("In state:", card);
            console.log("Left:", cardResult.data.remaining);

            if (cardResult.data.remaining === 0) {
                alert('Error: no cards remaining!')
            }
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
                console.log("first renering");
            }
            catch(e) {
                console.log("Fetching Problem", e);
            }
        }
        fetchDeck();
    }, []);
    


    console.log("ID:", deckId);  
    console.log("Card out", card.image);
    console.log("Rerendering");  
    return (
        <div>
           <GetCardButton deckId = {deckId} fetchCard={ fetchCard } />
           <Card image = { card.image } />
        </div>
    )
}

export default Deck;