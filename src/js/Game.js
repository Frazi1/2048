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

	spawnTile () {
		const emptyCells = this.emptyTiles
		const value = _.random() > 0.5 ? 4 : 2
		const targetTile = emptyCells[_.random(emptyCells.length)]
		// const targetTile = emptyCells[0]
		targetTile.value = value
		this.addTile(targetTile)
		return targetTile
	}

	addTile (tile) {
		this.field[tile.row][tile.col] = tile.value
	}

	getRow (row) {
		return this.field[row]
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
		const transitions = []
		const startingPoint = this.getStartingPointFor(directionType)

		if (directionType === DirectionType.RIGHT || directionType === DirectionType.LEFT) {
			for (let row = 0; row < this.size; row++) {
				let currentPoint = new Point(row, startingPoint.col)
				while (this.isInBounds(currentPoint)) {
					let nextPoint = direction.moveForwardFrom(currentPoint)
					if (this.isPointEmpty(currentPoint) === false && this.isInBounds(nextPoint)) {
						transitions.push(this.move(currentPoint, nextPoint))
					}
					currentPoint = direction.moveBackwardFrom(currentPoint)
				}
			}
		}

		return transitions
	}

	move (fromPoint, toPoint) {
		const oldCellValue = this.getCellValue(fromPoint.row, fromPoint.col)
		this.setCellValue(toPoint.row, toPoint.col, oldCellValue)
		this.setCellValue(fromPoint.row, fromPoint.col, undefined)
		return new Transition(fromPoint, toPoint, oldCellValue, oldCellValue)
	}

	getDirection (directionType) {
		return _(this._directions).find((d) => d.type === directionType)
	}

	canMoveFrom (point, directionType) {
		const newPoint = this.getDirection(directionType).moveForwardFrom(point)
		return this.isInBounds(newPoint) && this.getCellValue()
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
				return this._minPoint
			case DirectionType.UP:
				return this._maxPoint
		}
	}
}