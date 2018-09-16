/*
 * @requires Direction.js
 * @requires HtmlHelper.js
 */
class Interactor {
  constructor (game) {
    this._game = game
  }

  handleKeyEvent (event) {
    console.log(event)
    let directionType
    switch (event.which) {
      case 37:
        directionType = DirectionType.LEFT
        break
      case 38:
        directionType = DirectionType.UP
        break
      case 39:
        directionType = DirectionType.RIGHT
        break
      case 40:
        directionType = DirectionType.DOWN
        break
      case 32: //space
        if (event.ctrlKey)
          HtmlHelper.clearTileDivs()
        else
          HtmlHelper.addTileDiv(this._game.spawnRandomTile())
      default:
        return
    }
    const swipeResult = this._game.swipe(directionType)
    Interactor.draw(this._game, swipeResult.transitions, swipeResult.newTile)
    if (this._game.isGameOver()) {
      alert('game over')
      return
    }
    console.log(this._game.field)
  }

  static draw (game, transitions, newTile) {
    HtmlHelper.clearTileDivs()
    _(game.notEmptyTiles).each(tile => HtmlHelper.addTileDiv(tile))
  }

  // handleTransitions (transitions, newTile) {
  //   let transitionsCounter = 0
  //   let finishedTransitions = 0
  //   let newTileAdded = false
  //   _(transitions)
  //     .filter((t) => t instanceof MoveTransition)
  //     .each((t) => {
  //       const currentPositionCssClass = HtmlHelper.getPositionsCssClass(t.fromPoint.row, t.fromPoint.col)
  //       const tileDiv = $(`.${currentPositionCssClass}`)
  //       tileDiv
  //         .removeClass(currentPositionCssClass)
  //         .removeClass(HtmlHelper.getValueCssClass(t.oldValue))
  //         .addClass(HtmlHelper.getPositionsCssClass(t.toPoint.row, t.toPoint.col))
  //         .addClass(HtmlHelper.getValueCssClass(t.newValue))
  //       tileDiv.on(Interactor.whichTransitionEvent(), () => {
  //         if (++finishedTransitions === transitionsCounter) {
  //           _(transitions)
  //             .filter((t) => t instanceof RemoveTransition)
  //             .each((t) => {
  //               $(`.${HtmlHelper.getPositionsCssClass(t.fromPoint.row, t.fromPoint.col)}.${HtmlHelper.getValueCssClass(t.oldValue)}`)
  //                 .remove()
  //             })
  //           if (newTile !== null) {
  //             HtmlHelper.addTileDiv(newTile)
  //             newTileAdded = true
  //           }
  //         }
  //       })
  //       transitionsCounter++
  //     })
  //
  //   if (newTileAdded === false)
  //     HtmlHelper.addTileDiv(newTile)
  // }

  // static whichTransitionEvent () {
  //   let t
  //   const el = document.createElement('fakeelement')
  //   const transitions = {
  //     'transition': 'transitionend',
  //     'OTransition': 'oTransitionEnd',
  //     'MozTransition': 'transitionend',
  //     'WebkitTransition': 'webkitTransitionEnd'
  //   }
  //
  //   for (t in transitions) {
  //     if (el.style[t] !== undefined) {
  //       return transitions[t]
  //     }
  //   }
  // }
}