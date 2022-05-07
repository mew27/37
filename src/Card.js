import React from 'react';
import "./Cards.css"
import getCardStyle from './cardStyle'

class Card extends React.Component {

    seme_carta = this.props.cardtype.split("_")[0]
    numero_carta = this.props.cardtype.split("_")[1]

    constructor(props) {
        super(props)

        this.cardDiv = React.createRef();
        //this.startAnimation = this.startAnimation.bind(this)

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
    }

    playCard(playedByPlayer) {
      //console.log("Sending Prepare animation message with bounding_rect = ")
      //let thisBoundingRect = this.cardDiv.current.getBoundingClientRect();

      //var seme_carta = this.props.cardtype.split("_")[0]
      //var numero_carta = this.props.cardtype.split("_")[1]

      //let thisCardStyle = getCardStyle(this.seme_carta, this.numero_carta, false)

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

        const cardStyle = getCardStyle(this.seme_carta, this.numero_carta, hideCard)

        return (
            <>
                <div ref={this.cardDiv} className={"CardDiv" + (playable ? " CardPlayable" : "")} style={cardStyle} onClick={() => (clickable && playable) ? makeMove(cardtype, this.cardDiv.current.getBoundingClientRect()) : null}>
                    {this.numero_carta > 7 && !hideCard ? <div className="whiteSquare"></div> : null}
                </div>
            </>
        )
    }
}

export default Card;
