'use strict'

class Tile {
	constructor (row, col, value) {
		this._row = row
		this._col = col
		this._value = value
	}

	get row () {
		return this._row
	}

	get col () {
		return this._col
	}

	get value () {
		return this._value
	}

	set value (value) {
		this._value = value
	}
}