import './GetCardButton.css'

function GetCardButton({fetchCard}) {
    return (
        <div>
            <button className="GetCardButton" onClick={ fetchCard } >Get a card !</button>
        </div>
    )
}

export default GetCardButton;