import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import "./PlayedCards.css"
import PubSub from 'pubsub-js'

class PlayedCards extends React.Component {

    state = {played: null, playedByPlayer: null}

    alreadyPlayed  = false

    playCard(card) {
      if (!this.alreadyPlayed) {
        this.alreadyPlayed = true
        PubSub.publish('PLAY_CARD', card)
      }
    }

    constructor(props) {
        super(props)

        this.playedcardDiv = React.createRef();

        PubSub.subscribe('MAKE_MOVE' , (msg, enemyCards) => {
          if (this.props.turn == 1) {
            if(this.state.played !== null) {
              for (let i = 0; i < enemyCards.length; i++) {
                console.log(enemyCards[i] + " - " + this.state.played[0])
                if (enemyCards[i].split("_")[0] == this.state.played[0].split("_")[0]) {
                  var chosenIndex = i
                  var playedCard = enemyCards[chosenIndex]
                  console.log("Playing " + playedCard)
                  this.playCard(playedCard)
                  return
                }
              }
              var playedCard = enemyCards[enemyCards.length - 1]
              this.playCard(playedCard)
            } else {
              var playedCard = enemyCards[Math.floor(Math.random()*enemyCards.length)];
              this.playCard(playedCard)
            }
          }
        })

    }

    componentDidMount() {

        PubSub.subscribe('PREPARE_ANIMATION', (msg, data) => {

          console.log(this.playedcardDiv.current.lastChild)
          let nextCardElement = this.playedcardDiv.current.lastChild

          let animationState = {
            starting: {
              top:    data.rect.top,
              right:  data.rect.right,
              bottom: data.rect.bottom,
              left:   data.rect.left
            },
            ending: {
              top:    nextCardElement.getBoundingClientRect().top,
              right:  nextCardElement.getBoundingClientRect().right,
              bottom: nextCardElement.getBoundingClientRect().bottom,
              left:   nextCardElement.getBoundingClientRect().left
            },
            cardStyle : data.cardStyle,
            cardType : data.cardType,
            playedByPlayer : data.playedByPlayer
          }

          PubSub.publish('START_ANIMATION', animationState)
        })

        PubSub.subscribe('ANIMATION_FINISHED', (msg, data) => {
          this.setState((prevState) => {
            let newPlayed = prevState.played ? [prevState.played, data.cardType] : [data.cardType]

            if (data.playedByPlayer)
              return {played : newPlayed.flatMap(x => x), playedByPlayer : data.cardType}
            else
              return {played : newPlayed.flatMap(x => x)}
          })
          this.alreadyPlayed = false
          PubSub.publish('MADE_MOVE', '')
        })
    }

    componentDidUpdate() {
      if (this.state.played !== null && this.state.played.length == 2 && this.state.playedByPlayer != null) {
        var goodOlState = this.state
        setTimeout(() => {
          //console.log("played state" + this.state.played)
          PubSub.publish('ADVANCE_TURN', {lastTurn : this.props.turn, played : goodOlState.played, playedByPlayer : goodOlState.playedByPlayer})
          //console.log("Te lo invio un po' di volte")
          this.setState({played : null, playedByPlayer : null})
        }, 500)
      }
    }

    componentWillUnmount() {
      PubSub.unsubscribe('ANIMATION_FINISHED')
      PubSub.unsubscribe('PREPARE_ANIMATION')
    }


    render() {

        return (
        <>
        <div className="PlayedCardsDiv" ref={this.playedcardDiv} style={{alignItems: "flex-start"}}>
            {this.state.played ? this.state.played.map((val, idx) => {return (<Card key={idx} notClickable={true} cardtype={val}></Card>)}) : <Card notClickable={true} notVisible={true} cardtype={"unknown_1"}></Card> }
        </div>
        </>)
    }
}

export default PlayedCards;
