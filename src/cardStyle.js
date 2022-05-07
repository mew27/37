import deck from "./assets/deck.png";

function getCardStyle(seme_carta, numero_carta, hidden) {
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
          //console.log("Seme non valido.")
  }

  var column = parseInt(numero_carta)

  if (column === null || isNaN(column) || column < 1 || column > 10) {
      //console.log("Numero non valido.")
      //console.log(this.props.cardtype)
      column  = 2
  } else {
      column = column  - 1
  }

  if (column >= 7)
      column += 3

  if (hidden) {
      column  = 2
      row = 4;
  }

  var position_y = - (row * 179.3)
  var position_x = - (column * 115.3)

  //console.log(position_x + "px" + position_y + "0px",)

  return {
      backgroundImage: "url(" + deck + ")",
      backgroundPosition: position_x + "px " + position_y + "px",
      width: "116px",
      height:"180px",
      visibility: (seme_carta === "Hidden" ? "hidden" : null)
  }
}

export default getCardStyle;
