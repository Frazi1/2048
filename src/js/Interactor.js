/*
 * @requires logic/Direction.js
 * @requires html/HtmlHelper.js
 */
class Interactor {

  constructor() {
    this.game = null
  }

  handleDirectionSwipe(event) {
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
      default:
        return false
    }
    event.preventDefault()
    const swipeResult = this.game.swipe(directionType)
    this.draw()
    if (this.game.isGameOver()) {
      alert('game over')
      return
    }

    console.log(this.game.field)

    return true
  }

  handleKeyEvent (event) {
    console.log(event)

    if(this.handleDirectionSwipe(event) === true) return

    switch (event.which) {
      case 32: //space
        if (event.ctrlKey)
          HtmlHelper.clearTileDivs()
        else
          this.addRandomTile()
        break
    }
  }

  addRandomTile () {
    HtmlHelper.addTileDiv(this.game.spawnRandomTile())
  }

  draw () {
    HtmlHelper.clearTileDivs()
    _(this.game.notEmptyTiles).each(tile => HtmlHelper.addTileDiv(tile))
    HtmlHelper.setScore(this.game.score)
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