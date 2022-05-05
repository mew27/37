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

function calculatePoint(cardsOnTable, lastMover) {

  let playedByPlayer
  let playedByCpu

  for (let card in cardsOnTable) {
    if (cardsOnTable[card] == "Player") {
      playedByPlayer = card
    } else {
      playedByCpu = card
    }
  }

  var semeCardCpu = playedByCpu.split("_")[0]
  var numCardCpu = parseInt(playedByCpu.split("_")[1])

  var semeCardPlayer = playedByPlayer.split("_")[0]
  var numCardPlayer = parseInt(playedByPlayer.split("_")[1])

  var points = valueCards[numCardCpu - 1] + valueCards[numCardPlayer - 1]

  if (semeCardCpu !== semeCardPlayer) {
    if (lastMover === "Player")
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

  state = {deck : [], turn : 0, nextTurn : 1, playStarted : 1,  enemyCards : [],  playerCards : [], cardsOnTable : {}, playerPoints : 0, cpuPoints : 0, lastMover : "None"}


  drawCards(numDraw, deck) {
      var drawnCards = []

      for(var i = 0; i < numDraw; i++) {
          drawnCards.push(deck.pop())
      }

      return drawnCards
  }

  constructor (props) {
    super(props)

    let semi = ["Spade", "Denari", "Bastoni", "Coppe"]

    for (const seme of semi) {
        for (let i = 1; i < 11; i++) {
            this.state.deck.push(seme + "_" + i.toString())
        }
    }
    shuffle(this.state.deck);

    let newdeck = this.state.deck.splice(0, this.state.deck.length)

    this.state.enemyCards = this.drawCards(10, newdeck)
    this.state.playerCards = this.drawCards(10, newdeck)

    this.state.deck = newdeck

    this.makeMove = this.makeMove.bind(this)
  }

  makeMove(cardPlayed) {
    //console.log("Making move " + cardPlayed)
    this.setState((prevState) => {
      let playerCards = prevState.playerCards
      let enemyCards = prevState.enemyCards

      if (prevState.turn === 0)
        playerCards = playerCards.filter((x) => x !== cardPlayed)
      else
        enemyCards = enemyCards.filter((x) => x !== cardPlayed)

      let Mover = prevState.turn === 0 ? "Player" : "CPU"
      let cardsOnTable = prevState.cardsOnTable
      cardsOnTable[cardPlayed] = Mover

      console.log(playerCards)

      return {turn : prevState.nextTurn, nextTurn : 2, cardsOnTable : cardsOnTable, playerCards : playerCards, enemyCards : enemyCards, lastMover : Mover}
    })
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    let turn = 0
    let nextTurn = 1
    let addPlayerPoints = 0
    let addCpuPoints = 0

    if (this.state.turn === 2) {
      let result = calculatePoint(this.state.cardsOnTable, this.state.lastMover)

      if (result.winner === "Player") {
        turn = 0
        nextTurn = 1
        addPlayerPoints = result.points
      } else {
        turn = 1
        nextTurn = 0
        addCpuPoints = result.points
      }


      this.setState({turn : turn, nextTurn : nextTurn, playerPoints : this.state.playerPoints + addPlayerPoints, cpuPoints : this.state.cpuPoints + addCpuPoints, cardsOnTable : {}})
    } else if (this.state.turn === 1) {
      let chosenCard

      if (Object.keys(this.state.cardsOnTable).length === 0) {
        chosenCard = this.state.enemyCards[Math.floor(Math.random() * this.state.enemyCards.length)]
      } else {
        for (let card of this.state.enemyCards) {
          if (card.split("_")[0] == Object.keys(this.state.cardsOnTable)[0].split("_")[0]) {
            chosenCard = card
            break
          }
        }
      }

      if (chosenCard == undefined)
        chosenCard = this.state.enemyCards[Math.floor(Math.random() * this.state.enemyCards.length)]

      this.makeMove(chosenCard)
      console.log("Playing card "+ chosenCard)
    }
  }

  componentWillUnmount() {

  }

  render() {
    //console.log(this.state.cardsOnTable)
    return (
      <>
      <CardAnimation></CardAnimation>
      <div className="TableContainer">
        <div className="Table">
          <CardHolder cardsOnTable={this.state.cardsOnTable} turn={this.state.turn} yourCards={this.state.playerCards} enemyCards={this.state.enemyCards} makeMove={this.makeMove}></CardHolder>
        </div>
      </div>
      </>
    );
  }
}

export default App;
