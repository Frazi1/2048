/*
 * @requires Point.js
 */

const DirectionType = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4
}

class Direction {
	get type () {}

	get valueIncrementor () {

	}

	moveForwardFrom (point) {}

	moveBackwardFrom (point) {}
}

class HorizontalDirection extends Direction {
	moveForwardFrom (point) {
		return new Point(point.row, point.col + this.valueIncrementor)
	}

	moveBackwardFrom (point) {
		return new Point(point.row, point.col - this.valueIncrementor)
	}
}

class DirectionRight extends HorizontalDirection {

	get type () {
		return DirectionType.RIGHT
	}

	get valueIncrementor () {
		return 1
	}
}

class DirectionLeft extends HorizontalDirection {

	get type () {
		return DirectionType.LEFT
	}

	get valueIncrementor () {
		return -1
	}
}

class VerticalDirection extends Direction {
	moveForwardFrom (point) {
		return new Point(point.row + this.valueIncrementor, point.col)
	}

	moveBackwardFrom (point) {
		return new Point(point.row - this.valueIncrementor, point.col)
	}
}

class DirectionUp extends VerticalDirection {
	get type () {
		return DirectionType.UP
	}

	get valueIncrementor () {
		return -1
	}
}

class DirectionDown extends VerticalDirection {
	get type () {
		return DirectionType.DOWN
	}

	get valueIncrementor () {
		return 1
	}
}