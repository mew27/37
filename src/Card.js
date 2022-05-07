import React from 'react';
import "./Cards.css"
import getCardStyle from './cardStyle'

class Card extends React.Component {

    seme_carta = this.props.cardtype.split("_")[0]
    numero_carta = this.props.cardtype.split("_")[1]

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
    }

    render() {
        let {playable, clickable, makeMove, cardtype, hideCard} = this.props

        const cardStyle = getCardStyle(this.seme_carta, this.numero_carta, hideCard)

        return (
            <>
                <div id={this.props.cardtype !== "Hidden_1" ? this.props.cardtype : null} className={"CardDiv" + (playable ? " CardPlayable" : "")} style={cardStyle} onClick={() => (clickable && playable) ? makeMove(cardtype, document.getElementById(this.props.cardtype).getBoundingClientRect()) : null}>
                    {this.numero_carta > 7 && !hideCard ? <div className="whiteSquare"></div> : null}
                </div>
            </>
        )
    }
}

export default Card;
