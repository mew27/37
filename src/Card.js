import React from 'react';
import deck from "./assets/deck.png";
import "./Cards.css"

import PubSub from 'pubsub-js'

class Card extends React.Component {

    state = {played: false}

    constructor(props) {
        super(props)

        this.cardDiv = React.createRef();
        this.startAnimation = this.startAnimation.bind(this)
    }

    componentDidMount() {
        PubSub.subscribe('PLAYED_CARDS', (msg, data) => {
            if (data === this.props.cardtype) {
                //console.log("Inviato una volta")
                this.setState({played : true})
            }
        })
    }

    componentWillUnmount() {
      PubSub.unsubscribe('PLAYED_CARDS')
    }

    componentDidUpdate() {
    }

    startAnimation() {
        if (!this.props.notClickable) {
        //console.log("Sending Prepare animation message with bounding_rect = ")
        let thisBoundingRect = this.cardDiv.current.getBoundingClientRect();
        let thisCardStyle = {
            backgroundImage: this.cardDiv.current.style.backgroundImage,
            backgroundPosition: this.cardDiv.current.style.backgroundPosition,
            width: this.cardDiv.current.style.width,
            height: this.cardDiv.current.style.height,
        }
        PubSub.publish('PREPARE_ANIMATION', {rect: thisBoundingRect, cardStyle: thisCardStyle, cardType: this.props.cardtype})
        this.setState({played : true})
        //console.log(thisBoundingRect
        }
    }

    render() {
        var seme_carta = this.props.cardtype.split("_")[0]
        var numero_carta = this.props.cardtype.split("_")[1]

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

        if (this.props.hideCard) {
            column  = 2
            row = 4;
        }

        var position_y = - (row * 179.3)
        var position_x = - (column * 115.3)

        //console.log(position_x + "px" + position_y + "0px",)

        const cardStyle = {
            backgroundImage: "url(" + deck + ")",
            backgroundPosition: position_x + "px " + position_y + "px",
            width: "116px",
            height:"180px",
            visibility: (this.state.played || this.props.notVisible ? "hidden" : null)
        }

        return (
            <>
                <div ref={this.cardDiv} className="CardDiv" style={cardStyle} onClick={this.startAnimation}>
                    {numero_carta > 7 && !this.props.hideCard ? <div className="whiteSquare"></div> : null}
                </div>
            </>
        )
    }
}

export default Card;
