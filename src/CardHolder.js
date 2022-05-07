import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import PlayedCards from "./PlayedCards"
import PubSub from "pubsub-js"

class CardHolder extends React.Component {

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
        let playablePlayerCards = this.props.getPlayableCards(this.props.yourCards)

        return (
        <>
            <div className="CardHolderContainer" style={{top:"0px", alignItems: "flex-start"}}>
                {this.props.enemyCards.map((val, index) => {return <Card clickable={false} key={val + "_" + index} cardtype={val} hideCard={true}></Card>})}
            </div>

            <PlayedCards cardsPlayed={this.props.cardsOnTable}></PlayedCards>

            <div className="CardHolderContainer" style={{bottom: "0px", alignItems: "flex-end"}}>
                {this.props.yourCards.map((val, index) => {return <Card playable={playablePlayerCards.includes(val)} clickable={this.props.turn === 0 && !this.props.animating} makeMove={this.props.makeMove} key={val + "_" + index} cardtype={val} ></Card>})}
            </div>
        </>)
    }
}

export default CardHolder;
