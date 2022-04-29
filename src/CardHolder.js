import React from 'react';
import "./CardHolder.css"
import Card from "./Card"
import PlayedCards from "./PlayedCards"

class CardHolder extends React.Component {

    state = {yourCards: this.props.yourCards, enemyCards: this.props.enemyCards}

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        //console.log(this.state.played)
        return (
        <>
            <div className="CardHolderContainer" style={{top:"0px", alignItems: "flex-start"}}>
                {this.state.enemyCards.map((val, index) => {return <Card notClickable={true} key={index} cardtype={val} hideCard={true}></Card>})}
            </div>

            <PlayedCards></PlayedCards>

            <div className="CardHolderContainer" style={{bottom: "0px", alignItems: "flex-end"}}>
                {this.state.yourCards.map((val, index) => {return <Card key={index} cardtype={val} ></Card>})}
            </div>
        </>)
    }
}

export default CardHolder;
