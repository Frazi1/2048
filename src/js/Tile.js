'use strict'

class Tile {
	constructor (row, col, value, isMerged) {
		this._row = row
		this._col = col
		this._value = value
		this._isNew = true
		this._isMerged = _.isBoolean(isMerged) ? isMerged : false
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

	get isNew () {
		return this._isNew
	}

	set isNew (value) {
		this._isNew = value
	}

  get isMerged () {
    return this._isMerged
  }

  set isMerged (value) {
    this._isMerged = value
  }
}