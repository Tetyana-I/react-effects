import './Deck.css';
import axios from 'axios';
import { useState } from 'react';


const Deck = () => {
    const [numOfCards, setNumOfCards] = useState(52);
    const [deckIsEmpty, setDeckIsEmpty] = useState(true);

    const handleClick = () => {

        console.log("new card!");

    }


    return (
        <div>
            <button className="Deck-btn" onClick={ handleClick }>Get a card !</button>
        </div>
    )
}

export default Deck;