import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import "./PlayedCards.css"
import PubSub from 'pubsub-js'

class PlayedCards extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }


    render() {
        console.log(this.props.cardsPlayed)
        let CardsPlayedKeys = Object.keys(this.props.cardsPlayed)
        let keys = []

        keys[0] = CardsPlayedKeys[0] === undefined ? "Hidden_1" : CardsPlayedKeys[0]
        keys[1] = CardsPlayedKeys[1] === undefined ? "Hidden_1" : CardsPlayedKeys[1]

        return (
        <>
        <div className="PlayedCardsDiv" style={{alignItems: "flex-start"}}>
            {<div id="placeholderDiv_0"><Card notClickable={true} key={keys[0] + "_0"} cardtype={keys[0]}></Card></div>}
            {<div id="placeholderDiv_1"><Card notClickable={true} key={keys[1] + "_1"} cardtype={keys[1]}></Card></div>}
        </div>
        </>)
    }
}

export default PlayedCards;
