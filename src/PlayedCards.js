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

    }

    componentDidMount() {
        //PubSub.clearAllSubscriptions();
        //console.log("Already called?")
        //PubSub.subscribe('PLAYED_CARDS', (msg, data) => {this.setState({played : data})})

        PubSub.subscribe('PREPARE_ANIMATION', (msg, data) => {
          //console.log("Starting position:")
          //console.log(data)
          //console.log("Ending position: ")
          //console.log(this.playedcardDiv.current.getBoundingClientRect())
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
        })
    }

    componentWillUnmount() {
      PubSub.unsubscribe('ANIMATION_FINISHED')
      PubSub.unsubscribe('PREPARE_ANIMATION')
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.played != this.props.played) {
    //         this.setState({played: this.props.played})
    //     }
    // }

    render() {
        //console.log("Played Cards value = " + this.state.played)
        return (
        <>
        <div className="PlayedCardsDiv" ref={this.playedcardDiv} style={{alignItems: "flex-start"}}>
            {this.state.played ? this.state.played.map((val, idx) => {return (<Card key={idx} notClickable={true} cardtype={val}></Card>)}) : <Card notClickable={true} notVisible={true} cardtype={"unknown_1"}></Card> }
        </div>
        </>)
    }
}

export default PlayedCards;
