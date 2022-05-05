import React from 'react';
import deck from "./assets/deck.png";
import "./Cards.css"

import PubSub from 'pubsub-js'

class Card extends React.Component {

    seme_carta = this.props.cardtype.split("_")[0]
    numero_carta = this.props.cardtype.split("_")[1]

    constructor(props) {
        super(props)

        //this.cardDiv = React.createRef();
        //this.startAnimation = this.startAnimation.bind(this)

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
    }

    getCardStyle(seme_carta, numero_carta, hidden) {
      var row = 4;

      switch(seme_carta) {
          case "Spade" :
              row = 0
              break

          case "Denari" :
              row = 1
              break

          case "Coppe" :
              row = 2
              break

          case "Bastoni" :
              row = 3
              break

          default:
              row = 4
              console.log("Seme non valido.")
      }

      var column = parseInt(numero_carta)

      if (column === null || isNaN(column) || column < 1 || column > 10) {
          console.log("Numero non valido.")
          //console.log(this.props.cardtype)
          column  = 2
      } else {
          column = column  - 1
      }

      if (column >= 7)
          column += 3

      if (hidden) {
          column  = 2
          row = 4;
      }

      var position_y = - (row * 179.3)
      var position_x = - (column * 115.3)

      //console.log(position_x + "px" + position_y + "0px",)

      return {
          backgroundImage: "url(" + deck + ")",
          backgroundPosition: position_x + "px " + position_y + "px",
          width: "116px",
          height:"180px",
          //visibility: (this.state.played || this.props.notVisible ? "hidden" : null)
      }
    }

    playCard(playedByPlayer) {
      //console.log("Sending Prepare animation message with bounding_rect = ")
      //let thisBoundingRect = this.cardDiv.current.getBoundingClientRect();

      //var seme_carta = this.props.cardtype.split("_")[0]
      //var numero_carta = this.props.cardtype.split("_")[1]

      //let thisCardStyle = this.getCardStyle(this.seme_carta, this.numero_carta, false)

      //PubSub.publish('PREPARE_ANIMATION', {rect: thisBoundingRect, cardStyle: thisCardStyle, cardType: this.props.cardtype, playedByPlayer : playedByPlayer})
    }

    startAnimation() {
      /*
        if (this.props.clickable) {
          if (!this.waitingPlayed) {
            PubSub.publish('GET_PLAYED_CARDS', this.props.cardtype)
            this.waitingPlayed = true
          }
        }
      */
    }

    render() {
        let {playable, clickable, makeMove, cardtype, hideCard} = this.props

        const cardStyle = this.getCardStyle(this.seme_carta, this.numero_carta, hideCard)

        return (
            <>
                <div className={"CardDiv" + (playable ? " CardPlayable" : "")} style={cardStyle} onClick={() => (clickable && playable) ? makeMove(cardtype) : null}>
                    {this.numero_carta > 7 && !hideCard ? <div className="whiteSquare"></div> : null}
                </div>
            </>
        )
    }
}

export default Card;
