import logo from './logo.svg';
import './App.css';
import CardHolder from './CardHolder';
import CardAnimation from './CardAnimation'
import PubSub from 'pubsub-js'
import React from 'react';

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

class App extends React.Component {

  state = {turn : 1}

  constructor (props) {
    super(props)

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
    PubSub.subscribe('MADE_MOVE', (msg, data) => {

    })
  }


  drawCards(numDraw) {
      var drawnCards = []

      for(var i = 0; i < numDraw; i++) {
          drawnCards.push(this.deck.pop())
      }

      return drawnCards
  }


  render() {
    return (
      <>
      <CardAnimation></CardAnimation>
      <div className="TableContainer">
        <div className="Table">
          <CardHolder yourCards={this.drawCards(10)} enemyCards={this.drawCards(10)}></CardHolder>
        </div>
      </div>

      </>
    );
  }
}

export default App;
