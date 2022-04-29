import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import PlayedCards from "./PlayedCards"


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

class CardHolder extends React.Component {

    state = {played: null}

    constructor(props) {
        super(props)
        this.setPlayed = this.setPlayed.bind(this)
        this.deck = []

        let semi = ["Spade", "Denari", "Bastoni", "Coppe"]

        for (const seme of semi) {
            for (let i = 1; i < 11; i++) {
                this.deck.push(seme + "_" + i.toString())
            }
        }
        shuffle(this.deck);
    }

    componentDidMount() {

    }

    drawCards(numDraw) {
        var drawnCards = []

        for(var i = 0; i < numDraw; i++) {
            drawnCards.push(this.deck.pop())
        }

        return drawnCards
    }

    setPlayed(played) {

        this.setState({played : played})
    }

    render() {
        //console.log(this.state.played)
        return (
        <>
            <div className="CardHolderContainer" style={{top:"0px", alignItems: "flex-start"}}>
                {this.drawCards(10).map((val, index) => {return <Card notClickable={true} key={index} cardtype={val} hideCard={true}></Card>})}
            </div>

            <PlayedCards></PlayedCards>

            <div className="CardHolderContainer" style={{bottom: "0px", alignItems: "flex-end"}}>
                {this.drawCards(10).map((val, index) => {return <Card key={index} cardtype={val} ></Card>})}
            </div>
        </>)
    }
}

export default CardHolder;
