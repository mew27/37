import React from 'react';
import "./Scoreboard.css"

class Scoreboard extends React.Component {

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

        let menu = {}

        return (
          <>
          <div className="scoreboardClass">
              <div className="scoreboardElement"><div>Punti CPU : {Math.floor(this.props.cpuPoints)}</div></div>
              <div className="scoreboardElement"><div> Punti giocatore : {Math.floor(this.props.playerPoints)}</div></div>
          </div>
        </>)
    }
}

export default Scoreboard;
