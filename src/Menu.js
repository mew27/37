import React from 'react';
import "./Menu.css"

class Menu extends React.Component {

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

        if (this.props.finished) {
          if (this.props.winner == "Player")
            menu.titleOption = "Hai vinto !!!"
          else
            menu.titleOption = "Hai perso"

            menu.subOption = "Gioca ancora"
        } else {
          menu.titleOption = "TRESETTE by mew"
          menu.subOption = "Nuova partita"
        }



        return (
          <>
          <div className="menuClass">
            <div className="menuTitle">
              {menu.titleOption}
            </div>
            <div className="menuOption">
              <div className="menuButton" onClick={() => {this.props.playAgain()}}>
                <div className="buttonText">
                  {menu.subOption}
                </div>
              </div>
            </div>
          </div>
        </>)
    }
}

export default Menu;
