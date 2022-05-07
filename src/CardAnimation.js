function animateCard(data, divToAnimate, endAnimationCallback) {
  /*
  var numero_carta =  data.cardType.split("_")[1]

  if (numero_carta > 7)
    this.cardAnimationDiv.current.lastChild.style.visibility = null
  else
    this.cardAnimationDiv.current.lastChild.style.visibility = "hidden"

  */
  divToAnimate.style.top    =   data.starting.top     + "px"
  divToAnimate.style.bottom =   data.starting.bottom  + "px"
  divToAnimate.style.left   =   data.starting.left    + "px"
  divToAnimate.style.right  =   data.starting.right   + "px"

  /*
  divToAnimate.style.backgroundImage = data.cardStyle.backgroundImage
  divToAnimate.style.backgroundPosition = data.cardStyle.backgroundPosition

  */

  divToAnimate.style.visibility = null

  var speed = 1.2;
  var animTime = Math.max(Math.abs(data.ending.top - data.starting.top), Math.abs(data.ending.left - data.starting.left)) / speed

  var numStep = animTime / 16
  //console.log(numStep)

  var amounttop = Math.abs(data.ending.top - data.starting.top) / numStep
  var amountleft =  Math.abs(data.ending.left - data.starting.left) / numStep

  var stepCounter = 0
  var timer = setInterval(() => {
    stepCounter += 1

    let topval    = parseInt(divToAnimate.style.top.split("px")[0])
    let bottomval = parseInt(divToAnimate.style.bottom.split("px")[0])
    let leftval   = parseInt(divToAnimate.style.left.split("px")[0])
    let rightval  = parseInt(divToAnimate.style.right.split("px")[0])

    //console.log(topval)
    //console.log(data.ending.top)
    if (topval < data.ending.top)
      divToAnimate.style.top = topval + amounttop + "px"
    if (topval > data.ending.top)
      divToAnimate.style.top = topval - amounttop + "px"

    if (leftval < data.ending.left)
      divToAnimate.style.left = leftval + amountleft + "px"
    if (leftval > data.ending.left)
      divToAnimate.style.left = leftval - amountleft + "px"


    if (stepCounter > numStep) {
      clearInterval(timer)

      divToAnimate.style.visibility = "hidden"
      divToAnimate.style.top = data.ending.top + "px"
      divToAnimate.style.left = data.ending.left + "px"

      endAnimationCallback()

    }

  }, 16)
}

export default animateCard;
