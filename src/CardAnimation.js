import React from 'react';
import "./CardAnimation.css"


class CardAnimation extends React.Component {

    constructor(props) {
        super(props)

        this.cardAnimationDiv = React.createRef();
    }

    startAnimation(data) {
      //console.log("Starting animation with : ")
      //console.log(data)
      //this.setState({starting : data.starting, ending: data.ending})
      var numero_carta =  data.cardType.split("_")[1]

      if (numero_carta > 7)
        this.cardAnimationDiv.current.lastChild.style.visibility = null
      else
        this.cardAnimationDiv.current.lastChild.style.visibility = "hidden"


      this.cardAnimationDiv.current.style.top = data.starting.top + "px"
      this.cardAnimationDiv.current.style.bottom = data.starting.bottom + "px"
      this.cardAnimationDiv.current.style.left = data.starting.left + "px"
      this.cardAnimationDiv.current.style.right = data.starting.right + "px"

      this.cardAnimationDiv.current.style.backgroundImage = data.cardStyle.backgroundImage
      this.cardAnimationDiv.current.style.backgroundPosition = data.cardStyle.backgroundPosition

      this.cardAnimationDiv.current.style.visibility = null

      var speed = 1.2;
      var animTime = Math.max(Math.abs(data.ending.top - data.starting.top), Math.abs(data.ending.left - data.starting.left)) / speed

      var numStep = animTime / 16
      //console.log(numStep)

      var amounttop = Math.abs(data.ending.top - data.starting.top) / numStep
      var amountleft =  Math.abs(data.ending.left - data.starting.left) / numStep

      var stepCounter = 0
      var timer = setInterval(() => {
        stepCounter += 1

        let topval = parseInt(this.cardAnimationDiv.current.style.top.split("px")[0])
        let bottomval = parseInt(this.cardAnimationDiv.current.style.bottom.split("px")[0])
        let leftval = parseInt(this.cardAnimationDiv.current.style.left.split("px")[0])
        let rightval = parseInt(this.cardAnimationDiv.current.style.right.split("px")[0])

        //console.log(topval)
        //console.log(data.ending.top)
        if (topval < data.ending.top)
          this.cardAnimationDiv.current.style.top = topval + amounttop + "px"
        if (topval > data.ending.top)
          this.cardAnimationDiv.current.style.top = topval - amounttop + "px"

        if (leftval < data.ending.left)
          this.cardAnimationDiv.current.style.left = leftval + amountleft + "px"
        if (leftval > data.ending.left)
          this.cardAnimationDiv.current.style.left = leftval - amountleft + "px"


        if (stepCounter > numStep) {
          clearInterval(timer)

          this.cardAnimationDiv.current.style.visibility = "hidden"
          this.cardAnimationDiv.current.style.top = data.ending.top + "px"
          this.cardAnimationDiv.current.style.left = data.ending.left + "px"
          //PubSub.publish("ANIMATION_FINISHED", {cardType : data.cardType, playedByPlayer: data.playedByPlayer})
        }

      }, 16)
    }

    componentDidMount() {
      //console.log("Already called?")
      //console.log("Subscribing!!")

      //PubSub.subscribe('START_ANIMATION',)
    }

    componentWillUnmount() {
      //console.log("Ubsubscribing...")
      //PubSub.unsubscribe('START_ANIMATION')
    }

    render() {

        let style = {
          visibility : "hidden"
        }

        return (
            <>
                <div className="animationPlaceholder" ref={this.cardAnimationDiv} style={style}>
                  <div className="whiteSquare"></div>
                </div>
            </>
        )
    }
}

export default CardAnimation;
