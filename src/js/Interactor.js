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
		const transitions = this._game.swipe(directionType)
		this.handleTransitions(transitions)
		console.log(this._game.field)
	}

	handleTransitions (transitions) {
		_(transitions)
			.filter((t) => t instanceof MoveTransition)
			.each((t) => {
				const currentPositionCssClass = HtmlHelper.getPositionsCssClass(t.fromPoint.row, t.fromPoint.col)
				$(`.${currentPositionCssClass}`)
					.removeClass(currentPositionCssClass)
					.removeClass(HtmlHelper.getValueCssClass(t.oldValue))
					.addClass(HtmlHelper.getPositionsCssClass(t.toPoint.row, t.toPoint.col))
					.addClass(HtmlHelper.getValueCssClass(t.newValue))
			})

		_(transitions)
			.filter((t) => t instanceof RemoveTransition)
			.each((t) => {
				$(`.${HtmlHelper.getPositionsCssClass(t.fromPoint.row, t.fromPoint.col)}.${HtmlHelper.getValueCssClass(t.oldValue)}`)
					.remove()
			})

	}
}