import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import PlayedCards from "./PlayedCards"
import PubSub from "pubsub-js"

class CardHolder extends React.Component {

    //state = {yourCards: this.props.yourCards, enemyCards: this.props.enemyCards}

    initialYourCards = this.props.yourCards
    initialEnemyCards = this.props.enemyCards

    enemyCards = this.props.enemyCards.slice()

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentDidUpdate() {
      //console.log("Im getting called two times !")
      if (this.props.turn == 0) {

        let chosenIndex = Math.floor(Math.random()*this.enemyCards.length)
        let playedCard = this.enemyCards[chosenIndex]
        this.enemyCards.splice(chosenIndex, 1)

        PubSub.publish('PLAY_CARD', playedCard)
        console.log("Playing " + playedCard)
      }
    }

    componentWillUnmount() {

    }

    render() {
        //console.log(this.state.played)

        return (
        <>
            <div className="CardHolderContainer" style={{top:"0px", alignItems: "flex-start"}}>
                {this.initialEnemyCards.map((val, index) => {return <Card notClickable={true} key={index} cardtype={val} hideCard={true}></Card>})}
            </div>

            <PlayedCards></PlayedCards>

            <div className="CardHolderContainer" style={{bottom: "0px", alignItems: "flex-end"}}>
                {this.initialYourCards.map((val, index) => {return <Card notClickable={this.props.turn == 0} key={index} cardtype={val} ></Card>})}
            </div>
        </>)
    }
}

export default CardHolder;
