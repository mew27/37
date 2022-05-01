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

    return array
  }


var valueCards = [1, 1/3, 1/3, 0, 0, 0, 0, 1/3, 1/3, 1/3]
var importanceCard = [8, 9, 10, 1, 2, 3, 4, 5, 6, 7]

function calculatePoint(playedCards, playedByPlayer, lastMover) {

  if (playedCards[0] == playedByPlayer) {
    var playedByCpu = playedCards[1]
  } else {
    var playedByCpu = playedCards[0]
  }

  var semeCardCpu = playedByCpu.split("_")[0]
  var numCardCpu = parseInt(playedByCpu.split("_")[1])

  var semeCardPlayer = playedByPlayer.split("_")[0]
  var numCardPlayer = parseInt(playedByPlayer.split("_")[1])

  var points = valueCards[numCardCpu - 1] + valueCards[numCardPlayer - 1]

  if (semeCardCpu != semeCardPlayer) {
    if (lastMover == "Player")
      return {winner : "CPU", points : points}
    else
      return {winner : "Player", points : points}
  } else {
    if (importanceCard[numCardPlayer - 1] > importanceCard[numCardCpu - 1])
      return {winner : "Player", points : points}
    else
      return {winner : "CPU", points : points}
  }
}


class App extends React.Component {

  state = {turn : 0, lastMover: "None", lastScorerPoint : null}

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

      if (this.state.lastScorerPoint === null) {
        let newTurn = (this.state.turn + 1) % 3

        this.setState({turn : newTurn, lastMover : "Player"})
      } else {
        if (this.state.turn == 0) {
          if (this.state.lastScorerPoint == "Player")
            this.setState({turn : 1, lastMover : "Player"})
          else
            this.setState({turn : 2, lastMover : "Player"})
        } else if (this.state.turn == 1) {
          if (this.state.lastScorerPoint == "CPU")
            this.setState({turn : 0, lastMover : "CPU"})
          else
            this.setState({turn : 2, lastMover : "CPU"})
        }
      }
    })

    PubSub.subscribe('ADVANCE_TURN', (msg, data) => {
      //let lastMover = data.lastTurn == 0 ? "Player" : "CPU"
      //console.log("received data : " + data.played)
      let result = calculatePoint(data.played, data.playedByPlayer, this.state.lastMover)

      //console.log("played = " + data.played + "lastMover " + this.state.lastMover + " winner = " + result.winner)

      this.setState({turn : result.winner == "Player" ? 0 : 1, lastScorerPoint : result.winner})
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe('ADVANCE_TURN')
    PubSub.unsubscribe('MADE_MOVE')
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
          <CardHolder turn={this.state.turn} yourCards={this.drawCards(10)} enemyCards={this.drawCards(10)}></CardHolder>
        </div>
      </div>

      </>
    );
  }
}

export default App;
