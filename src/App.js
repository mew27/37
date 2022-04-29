import logo from './logo.svg';
import './App.css';
import CardHolder from './CardHolder';
import CardAnimation from './CardAnimation'
import PubSub from 'pubsub-js'
import React from 'react';

class App extends React.Component {

  state = {turn : 1}

  constructor (props) {
    super(props)
  }

  componentDidMount() {
    PubSub.subscribe('MADE_MOVE', (msg, data) => {

    })
  }

  render() {
    return (
      <>
      <CardAnimation></CardAnimation>
      <div className="TableContainer">
        <div className="Table">
          <CardHolder></CardHolder>
        </div>
      </div>

      </>
    );
  }
}

export default App;
