class Transition {
	constructor (fromPoint, oldValue) {
		this._fromPoint = fromPoint
		this._oldValue = oldValue
	}

	get fromPoint () {
		return this._fromPoint
	}

	set fromPoint (value) {
		this._fromPoint = value
	}

	get oldValue () {
		return this._oldValue
	}

	set oldValue (value) {
		this._oldValue = value
	}
}

class MoveTransition extends Transition {
	constructor (fromPoint, toPoint, oldValue, newValue) {
		super(fromPoint, oldValue)
		this._toPoint = toPoint
		this._newValue = newValue
	}

	get toPoint () {
		return this._toPoint
	}

	get newValue () {
		return this._newValue
	}

	set toPoint (value) {
		this._toPoint = value
	}

	set newValue (value) {
		this._newValue = value
	}
}

class RemoveTransition extends Transition {

}