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
				HtmlHelper.addTileDiv(this._game.spawnRandomTile())
			default:
				return
		}
		const swipeResult = this._game.swipe(directionType)
		this.handleTransitions(swipeResult.transitions, swipeResult.newTile)
		// HtmlHelper.addTileDiv(swipeResult.newTile)
		console.log(this._game.field)
	}

	handleTransitions (transitions, newTile) {
		let transitionsCounter = 0
		let finishedTransitions = 0
		_(transitions)
			.filter((t) => t instanceof MoveTransition)
			.each((t) => {
				const currentPositionCssClass = HtmlHelper.getPositionsCssClass(t.fromPoint.row, t.fromPoint.col)
				const tileDiv = $(`.${currentPositionCssClass}`)
				tileDiv
					.removeClass(currentPositionCssClass)
					.removeClass(HtmlHelper.getValueCssClass(t.oldValue))
					.addClass(HtmlHelper.getPositionsCssClass(t.toPoint.row, t.toPoint.col))
					.addClass(HtmlHelper.getValueCssClass(t.newValue))
				tileDiv.on(Interactor.whichTransitionEvent(), () => {
					if (++finishedTransitions === transitionsCounter) {
						_(transitions)
							.filter((t) => t instanceof RemoveTransition)
							.each((t) => {
								$(`.${HtmlHelper.getPositionsCssClass(t.fromPoint.row, t.fromPoint.col)}.${HtmlHelper.getValueCssClass(t.oldValue)}`)
									.remove()
							})
						if(newTile !== null)
							HtmlHelper.addTileDiv(newTile)
					}
				})
				transitionsCounter++
			})
	}

	static whichTransitionEvent () {
		let t
		const el = document.createElement('fakeelement')
		const transitions = {
			'transition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		}

		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t]
			}
		}
	}
}