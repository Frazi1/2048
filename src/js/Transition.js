class Transition {
	constructor (fromPoint, toPoint, oldValue, newValue) {
		this._fromPoint = fromPoint
		this._toPoint = toPoint
		this._oldValue = oldValue
		this._newValue = newValue
	}

	get fromPoint () {
		return this._fromPoint
	}

	get toPoint () {
		return this._toPoint
	}

	get oldValue () {
		return this._oldValue
	}

	get newValue () {
		return this._newValue
	}
}