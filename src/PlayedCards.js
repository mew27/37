import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import "./PlayedCards.css"
import PubSub from 'pubsub-js'

class PlayedCards extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
      /*
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

        PubSub.subscribe('GET_PLAYED_CARDS', (msg, data) => {
          PubSub.publish('PLAYED_CARDS_' + data, {played : this.state.played})
        })
        */
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
      /*
      PubSub.unsubscribe('ANIMATION_FINISHED')
      PubSub.unsubscribe('PREPARE_ANIMATION')
      */
    }


    render() {
        console.log(this.props.cardsPlayed)
        return (
        <>
        <div className="PlayedCardsDiv" style={{alignItems: "flex-start"}}>
            {Object.keys(this.props.cardsPlayed).map((val, idx) => {return (<Card key={val} notClickable={true} cardtype={val}></Card>)})}
        </div>
        </>)
    }
}

export default PlayedCards;
