## Part 2 -  Click to Keep Drawing
When the page *Deck of Card* loads, it goes to the Deck of Cards API to create a new deck, and shows a "Start drawing" button. When you click on the button the page will draw one card every second (The button could toggle between “Start drawing” and “Stop drawing”).

These draws will continue until the next button press, or until the deck has been exhausted (at which point the alert message “Error: no cards remaining!” appears). 

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