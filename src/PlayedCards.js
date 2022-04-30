import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import "./PlayedCards.css"
import PubSub from 'pubsub-js'

class PlayedCards extends React.Component {

    state = {played: null}

    constructor(props) {
        super(props)

        this.playedcardDiv = React.createRef();

        PubSub.subscribe('MAKE_MOVE' , (msg, enemyCards) => {
          if(this.state.played !== null) {
            for (let i = 0; i < enemyCards.length; i++) {
              console.log(enemyCards[i] + " - " + this.state.played[0])
              if (enemyCards[i].split("_")[0] == this.state.played[0].split("_")[0]) {
                var chosenIndex = i
                var playedCard = enemyCards[chosenIndex]
                console.log("Playing " + playedCard)
                PubSub.publish('PLAY_CARD', playedCard)
                break
              }
            }
          } else {
            var chosenIndex = Math.floor(Math.random() * enemyCards.length)
            var playedCard = enemyCards[chosenIndex]
            //console.log("Playing " + playedCard)
            PubSub.publish('PLAY_CARD', playedCard)
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
            cardType : data.cardType
          }

          PubSub.publish('START_ANIMATION', animationState)
        })

        PubSub.subscribe('ANIMATION_FINISHED', (msg, data) => {
          this.setState((prevState) => {
            let newPlayed = prevState.played ? [prevState.played, data] : [data]
            //console.log()
            return {played : newPlayed.flatMap(x => x)}
          })
          PubSub.publish('MADE_MOVE', '')
        })
    }

    componentDidUpdate() {
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
