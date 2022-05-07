import React from 'react';
import getCardStyle from './cardStyle'
import "./Deck.css"

class Deck extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {

    }

    render() {
        const cardStyle = getCardStyle("Denari", "3", true)

        if (this.props.deck.length !== 0) {
          return (
          <>
          <div class="deckClass" style={cardStyle}>
          </div>
          </>)
        } else {
          return (
          <>
          </>)
        }
    }
}

export default Deck;
