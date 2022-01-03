## Part 1 - Deck of Cards
*Deck of Card* app displays a deck of cards, one card at a time. When the page loads, it goes to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.

Every button click, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message appears on the screen with the text “Error: no cards remaining!”.

This application uses 3 components:

- *App* renders the *Deck* component.
- *Deck* creates a new deck, shows a button that let us draw a card from the deck; renders a *Card* component. 
- *Card* displays a card image. 

### Technologies used

React, Create React App, HTML, CSS

External API: *Deck of Cards* http://deckofcardsapi.com/

### Local Deployment

1. Create an application directory 

2. Clone Repository

3. Switch to the application directory

4. Create dependencies

    `npm install`

5. Run the script

    `npm start`

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.


