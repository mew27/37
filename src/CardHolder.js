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

        PubSub.subscribe('PLAY_CARD', (msg, data) => {
          //console.log(this.props.cardtype
          this.enemyCards.splice(this.enemyCards.indexOf(data), 1)
        })
    }

    componentDidMount() {
    }

    componentDidUpdate() {
      // console.log("Im getting called two times !")

      if (this.props.turn == 1) {

        PubSub.publish('MAKE_MOVE', this.enemyCards)
      }
    }

    componentWillUnmount() {

    }

    render() {
        //console.log(this.state.played)

        return (
        <>
            <div className="CardHolderContainer" style={{top:"0px", alignItems: "flex-start"}}>
                {this.initialEnemyCards.map((val, index) => {return <Card clickable={false} key={index} cardtype={val} hideCard={true}></Card>})}
            </div>

            <PlayedCards turn={this.props.turn}></PlayedCards>

            <div className="CardHolderContainer" style={{bottom: "0px", alignItems: "flex-end"}}>
                {this.initialYourCards.map((val, index) => {return <Card clickable={this.props.turn === 0} key={index} cardtype={val} ></Card>})}
            </div>
        </>)
    }
}

export default CardHolder;
