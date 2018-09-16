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
		const targetTile = emptyCells[_.random(emptyCells.length - 1)]
		// const targetTile = emptyCells[0]
		targetTile.value = value
		return this.spawnTile(targetTile)
	}

	addTile (tile) {
		this.field[tile.row][tile.col] = tile
	}

	getRow (row) {
		return this.field[row]
	}

	getCellValueFromPoint (point) {
		return this.getCellValue(point.row, point.col)
	}

	getTileFromPoint (point) {
	  return this.getTile(point.row, point.col)
  }

  getTile(row, col) {
	  return this.getRow(row)[col]
  }

	getCellValue (row, col) {
    const tile = this.getTile(row, col)
    return tile
      ? tile.value
      : undefined
	}

	setCellTile (row, col, tile) {
		this.getRow(row)[col] = tile
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
	  this.resetNewTiles()
    this.resetMergedTiles()

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

		return {transitions: transitions, newTile: transitions.length > 0 ? this.spawnRandomTile() : null}
	}

	move (fromPoint, toPoint) {
		const oldCellValue = this.getCellValue(fromPoint.row, fromPoint.col)

		let moveTransition = new MoveTransition(fromPoint, toPoint, oldCellValue, oldCellValue)
		if(moveTransition.isSameSpot === false)
			this.changeTileLocation(fromPoint, toPoint, new Tile(toPoint.row, toPoint.col, oldCellValue))
		return moveTransition
	}

	changeTileLocation (fromPoint, toPoint, tile) {
		this.setCellTile(toPoint.row, toPoint.col, tile)
		this.setCellTile(fromPoint.row, fromPoint.col, undefined)
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
      this.changeTileLocation(
        moveTransition.toPoint,
				mergePoint,
				new Tile(mergePoint.row, mergePoint.col, moveTransition.newValue, true))

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
    // let fromEmpty = this.isPointEmpty(fromPoint) === false
    // let fromInBounds = this.isInBounds(newPoint)
    // let newEmpty = this.isPointEmpty(newPoint) === false
    // let valuesAreEqual = this.getCellValueFromPoint(fromPoint) === this.getCellValueFromPoint(newPoint)
    // let fromIsNotNew = this.getTileFromPoint(fromPoint).isMerged === false
    // let newInInBounds = this.isInBounds(newPoint)
    // if(!newInInBounds) return false
    // let NewIsNotNew = this.getTileFromPoint(newPoint).isMerged === false
    // return fromEmpty
			// && fromInBounds
			// && newEmpty
			// && valuesAreEqual
    //   && fromIsNotNew
    //   && NewIsNotNew
    return this.isPointEmpty(fromPoint) === false
      && this.isInBounds(newPoint)
      && this.isPointEmpty(newPoint) === false
      && this.getCellValueFromPoint(fromPoint) === this.getCellValueFromPoint(newPoint)
      && this.getTileFromPoint(fromPoint).isMerged === false
      && this.getTileFromPoint(newPoint).isMerged === false
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

  get notEmptyTiles() {
    let result = []
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        let point = new Point(row, col)
        if (this.isPointEmpty(point) === false)
          result.push(this.getTileFromPoint(point))
      }
    }
    return result
  }

  resetNewTiles () {
    _(this.notEmptyTiles)
      .forEach(t => t.isNew = false)
  }

  resetMergedTiles() {
    _(this.notEmptyTiles)
      .forEach(function (t) {
				t.isMerged = false
      })
  }

  isGameOver() {
	  if(this.emptyTiles.length !== 0) return false
    return true === _(this.notEmptyTiles)
      .some(tile => {
        const point = new Point(tile.row, tile.col)
        return true === _(this._directions)
          .some(direction => this.canMoveFrom(point, direction.type) || this.canMergeInDirection(point, direction))
      })
  }
}