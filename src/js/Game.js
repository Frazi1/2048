/**
 * @requires Tile.js
 * @requires Transition.js
 * @requires Point.js
 */

'use strict'

class Game {
	constructor (size) {
		this.size = size
		this.field = []
		for (let i = 0; i < size; i++) {
			this.field[i] = []
		}

		this._minPoint = new Point(0, 0)
		this._maxPoint = new Point(size - 1, size - 1)
		this._directions = [
			new DirectionDown(),
			new DirectionUp(),
			new DirectionLeft(),
			new DirectionRight()
		]
	}


	spawnTile(tile) {
		this.addTile(tile)
		return tile
	}

	spawnRandomTile () {
		const emptyCells = this.emptyTiles
		const value = _.random() > 0.5 ? 4 : 2
		const targetTile = emptyCells[_.random(emptyCells.length)]
		// const targetTile = emptyCells[0]
		targetTile.value = value
		return this.spawnTile(targetTile)
	}

	addTile (tile) {
		this.field[tile.row][tile.col] = tile.value
	}

	getRow (row) {
		return this.field[row]
	}

	getCellValueFromPoint (point) {
		return this.getCellValue(point.row, point.col)
	}

	getCellValue (row, col) {
		return this.getRow(row)[col]
	}

	setCellValue (row, col, value) {
		this.getRow(row)[col] = value
	}

	get emptyTiles () {
		let result = []
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				if (this.isPointEmpty(new Point(row, col)))
					result.push(new Tile(row, col))
			}
		}
		return result
	}

	isPointEmpty (point) {
		const cellValue = this.getCellValue(point.row, point.col)
		return _.isUndefined(cellValue)
	}

	swipe (directionType) {
		const direction = this.getDirection(directionType)
		let transitions = []
		const startingPoint = this.getStartingPointFor(directionType)

		for (let axisIndex = 0; axisIndex < this.size; axisIndex++) {
			let currentPoint
			if (directionType === DirectionType.RIGHT || directionType === DirectionType.LEFT)
				currentPoint = new Point(axisIndex, startingPoint.col)
			else if (directionType === DirectionType.UP || directionType === DirectionType.DOWN)
				currentPoint = new Point(startingPoint.row, axisIndex)

			while (this.isInBounds(currentPoint)) {
				if (this.isPointEmpty(currentPoint) === false
					&& (this.canMoveFrom(currentPoint, directionType) || this.canMergeInDirection(currentPoint, this.getDirection(directionType)))) {
					transitions = transitions.concat(this.moveInDirection(currentPoint, directionType))
				}
				currentPoint = direction.moveBackwardFrom(currentPoint)
			}
		}

		return transitions
	}

	move (fromPoint, toPoint) {
		const oldCellValue = this.getCellValue(fromPoint.row, fromPoint.col)

		let moveTransition = new MoveTransition(fromPoint, toPoint, oldCellValue, oldCellValue)
		if(moveTransition.isSameSpot === false)
			this.changeTileLocation(fromPoint, toPoint, oldCellValue)
		return moveTransition
	}

	changeTileLocation (fromPoint, toPoint, cellValue) {
		this.setCellValue(toPoint.row, toPoint.col, cellValue)
		this.setCellValue(fromPoint.row, fromPoint.col, undefined)
	}

	moveInDirection (fromPoint, directionType) {
		const direction = this.getDirection(directionType)
		let toPoint = fromPoint
		while (this.canMoveFrom(toPoint, directionType)) {
			toPoint = direction.moveForwardFrom(toPoint)
		}

		let moveTransition = this.move(fromPoint, toPoint)
		const transitions = [moveTransition]

		if (this.canMergeInDirection(toPoint, direction)) {
			moveTransition.newValue = moveTransition.oldValue * 2
			const mergePoint = direction.moveForwardFrom(moveTransition.toPoint)
			this.changeTileLocation(moveTransition.toPoint, mergePoint, moveTransition.newValue)
			moveTransition.toPoint = mergePoint
			return [moveTransition, new RemoveTransition(moveTransition.toPoint, moveTransition.oldValue)]
		}
		return transitions
	}

	getDirection (directionType) {
		if (_.isUndefined(directionType))
			throw new Error('getDirection: directionType should be defined')
		return _(this._directions).find((d) => d.type === directionType)
	}

	canMoveFrom (point, directionType) {
		const newPoint = this.getDirection(directionType).moveForwardFrom(point)
		return this.isInBounds(newPoint)
			&& _.isUndefined(this.getCellValue(newPoint.row, newPoint.col))
	}

	canMergeInDirection (fromPoint, direction) {
		const newPoint = direction.moveForwardFrom(fromPoint)
		return this.isPointEmpty(fromPoint) === false
			&& this.isInBounds(newPoint)
			&& this.isPointEmpty(newPoint) === false
			&& this.getCellValueFromPoint(fromPoint) === this.getCellValueFromPoint(newPoint)
	}

	isInBounds (point) {
		return point.row >= 0
			&& point.row < this.size
			&& point.col >= 0
			&& point.col < this.size
	}

	getStartingPointFor (directionType) {
		switch (directionType) {
			case DirectionType.LEFT:
				return this._minPoint
			case DirectionType.RIGHT:
				return this._maxPoint
			case DirectionType.DOWN:
				return this._maxPoint
			case DirectionType.UP:
				return this._minPoint
		}
	}
}