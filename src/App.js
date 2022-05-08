import logo from './logo.svg';
import './App.css';
import CardHolder from './CardHolder';
import CardAnimation from './CardAnimation'
import Deck from './Deck'
import Menu from './Menu'
import Scoreboard from './Scoreboard'
import animateCard from './CardAnimation'
import getCardStyle from './cardStyle'
import React from 'react';
import './Cards.css'

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
  if (isNaN(points)) {
    console.log("Divento NAN !!! COME CRISTO")
  }
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

  state = {animating: false, deckAnimation:false, timeout : false, deck : [], finished : false, turn : 0, nextTurn : 1, playStarted : false,  enemyCards : [],  playerCards : [], cardsOnTable : {}, playerPoints : 0, cpuPoints : 0, lastMover : "None"}


  drawCards(numDraw, deck) {
      var drawnCards = []

      for(var i = 0; i < numDraw; i++) {
          drawnCards.push(deck.pop())
      }

      return drawnCards
  }

  newGame() {
    let deck = [], enemyCards, playerCards

    let semi = ["Spade", "Denari", "Bastoni", "Coppe"]

    for (const seme of semi) {
        for (let i = 1; i < 11; i++) {
            deck.push(seme + "_" + i.toString())
        }
    }

    deck = shuffle(deck)

    enemyCards = this.drawCards(10, deck)
    playerCards = this.drawCards(10, deck)

    return {animating: false, deckAnimation:false, timeout: false, deck : deck, playerCards : playerCards, enemyCards : enemyCards, finished: false, turn : 0, nextTurn : 1, playStarted : true, cardsOnTable : [],  playerPoints : 0, cpuPoints : 0, lastMover : "None"}
  }

  constructor (props) {
    super(props)

    let newGameState = this.newGame()
    this.makeMove = this.makeMove.bind(this)
    this.getPlayableCards = this.getPlayableCards.bind(this)
    this.playAgain = this.playAgain.bind(this)
  }

  makeMove(cardPlayed, animatingCardDiv) {

    //console.log(animatingCardDiv)
    let playerCards = this.state.playerCards
    let enemyCards = this.state.enemyCards

    if (this.state.turn === 0) {
      playerCards[playerCards.indexOf(cardPlayed)] = "Hidden_1"
      this.setState({deckPlayerAnimationRect : animatingCardDiv})
    } else {
      enemyCards[enemyCards.indexOf(cardPlayed)] = "Hidden_1"
      this.setState({deckEnemyAnimationRect : animatingCardDiv})
    }
    let Mover = this.state.turn === 0 ? "Player" : "CPU"


    this.setState({animating: true, animatingCard : cardPlayed, animatingCardDiv: animatingCardDiv, playerCards : playerCards, enemyCards : enemyCards, lastMover : Mover})
  }

  getPlayableCards(cards) {
    if (Object.keys(this.state.cardsOnTable).length === 0) {
      return cards
    }

    let playableSeme = Object.keys(this.state.cardsOnTable)[0].split("_")[0]
    let filteredCards = cards.filter((x) => x.split("_")[0] == playableSeme)

    return filteredCards.length > 0  ? filteredCards : cards
  }

  playAgain() {
    this.setState(this.newGame())
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    let turn = 0
    let nextTurn = 1
    let addPlayerPoints = 0
    let addCpuPoints = 0

    if (this.state.turn === 2 && !this.state.animating) {

      if (this.state.timeout) {
        setTimeout(() => {this.setState({timeout: false})}, 1000)

        return
      }
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
      let finished = false
      let playStarted = true
      console.log("state deck length (componentDidUpdate): " + this.state.deck.length)

      if (this.state.deck.length !== 0) {

        this.setState({animating: true, deckAnimation: true, deckWho: "Player"})
      }

      if (this.state.playerCards.filter((x) => x != "Hidden_1").length == 0 && this.state.enemyCards.filter((x) => x != "Hidden_1").length == 0) {
        finished = true
        playStarted = false
        if (this.state.playerPoints > this.state.cpuPoints)
          this.setState({winner : "Player"})
        else
          this.setState({winner : "CPU"})

      }

      this.setState({finished: finished, playStarted : playStarted, turn : turn, nextTurn : nextTurn, playerPoints : this.state.playerPoints + addPlayerPoints, cpuPoints : this.state.cpuPoints + addCpuPoints, cardsOnTable : {}})
    } else if (this.state.turn === 1 && !this.state.animating && !this.state.finished) {
      let chosenCard
      let chosableCards = this.state.enemyCards.filter((x) => x != "Hidden_1")

      if (Object.keys(this.state.cardsOnTable).length === 0) {
        chosenCard = chosableCards[Math.floor(Math.random() * chosableCards.length)]
      } else {
        for (let card of chosableCards) {
          if (card.split("_")[0] == Object.keys(this.state.cardsOnTable)[0].split("_")[0]) {
            chosenCard = card
            break
          }
        }
      }

      if (chosenCard == undefined)
        chosenCard = chosableCards[Math.floor(Math.random() * chosableCards.length)]

      this.makeMove(chosenCard, document.getElementById(chosenCard).getBoundingClientRect())
    }

    if (this.state.animating) {
      if (this.state.deckAnimation) {
        let divToAnimate = document.getElementById("deckPlaceholderId")
        let startingRect = document.getElementById("deckId").getBoundingClientRect()
        let nRect = {left : this.state.deckEnemyAnimationRect.left, bottom: this.state.deckEnemyAnimationRect.bottom, right : this.state.deckEnemyAnimationRect.right}
        nRect.top = parseInt(this.state.deckEnemyAnimationRect.top + 90)

        let oRect = {left : this.state.deckPlayerAnimationRect.left, bottom: this.state.deckPlayerAnimationRect.bottom, right : this.state.deckPlayerAnimationRect.right}
        oRect.top = parseInt(this.state.deckPlayerAnimationRect.top + 90)

        let dataPlayer = {starting : startingRect, ending : oRect}
        let dataEnemy = {starting : startingRect, ending : nRect}

        if (this.state.deckWho === "Player") {
          animateCard(dataPlayer, divToAnimate, () => {
            let newPlayerCards = this.state.playerCards.slice(0, this.state.playerCards.length)
            let newdeck = this.state.deck.slice(0, this.state.deck.length)
            let drawnCards = this.drawCards(1, newdeck)

            newPlayerCards[newPlayerCards.indexOf("Hidden_1")] = drawnCards[0]

            this.setState({playerCards : newPlayerCards, deck : newdeck, deckWho : "CPU"})
          })
        } else {
          animateCard(dataEnemy, divToAnimate, () => {
            let newEnemyCards = this.state.enemyCards.slice(0, this.state.enemyCards.length)
            let newdeck = this.state.deck.slice(0, this.state.deck.length)
            let drawnCards = this.drawCards(1, newdeck)

            newEnemyCards[newEnemyCards.indexOf("Hidden_1")] = drawnCards[0]

            this.setState({animating : false, deckAnimation : false, enemyCards : newEnemyCards, deck : newdeck})
          })
        }

      } else {
        let startingRect = this.state.animatingCardDiv
        let endingRect
        let cardsPlayed = Object.keys(this.state.cardsOnTable)

        if (cardsPlayed.length === 0)
          endingRect = document.getElementById("placeholderDiv_0").getBoundingClientRect()
        else
          endingRect = document.getElementById("placeholderDiv_1").getBoundingClientRect()

        let divToAnimate = document.getElementById("animationPlaceholderId")
        const animationStyle = getCardStyle(this.state.animatingCard.split("_")[0],this.state.animatingCard.split("_")[1], false)

        for (const property in animationStyle)
            divToAnimate.style[property] = animationStyle[property];

        if (this.state.animatingCard.split("_")[1] > 7)
          divToAnimate.lastChild.style.visibility = null
        else
          divToAnimate.lastChild.style.visibility = "hidden"

        let data = {starting : startingRect, ending : endingRect}

        animateCard(data, divToAnimate, () => {
          this.setState((prevState) => {
            let cardsOnTable = prevState.cardsOnTable
            let timeout = false
            cardsOnTable[prevState.animatingCard] = prevState.lastMover

            if (prevState.nextTurn === 2)
              timeout = true

            return {animating: false, timeout : timeout, turn : prevState.nextTurn, nextTurn : 2, cardsOnTable : cardsOnTable}
          })
        })
      }
    }
  }

  componentWillUnmount() {

  }

  render() {

    return (
      <>
      <div id="animationPlaceholderId" className="animationPlaceholderDiv">{this.state.animating ? <div className="whiteSquare"></div> : null}</div>
      {!this.state.playStarted ? <Menu finished={this.state.finished} winner={this.state.winner} playAgain={this.playAgain}></Menu> : <Scoreboard cpuPoints={this.state.cpuPoints} playerPoints={this.state.playerPoints}></Scoreboard>}
      <Deck deckId={"deckId"} deckPlaceholderId={"deckPlaceholderId"} deck={this.state.deck}></Deck>
      <div className="TableContainer">
        <div className="Table">
          <CardHolder getPlayableCards={this.getPlayableCards} cardsOnTable={this.state.cardsOnTable} animating={this.state.animating} turn={this.state.turn} yourCards={this.state.playerCards} enemyCards={this.state.enemyCards} makeMove={this.makeMove}></CardHolder>
        </div>
      </div>
      </>
    );
  }
}

export default App;
