class HtmlHelper {
	static buildGameField (size) {
		const container = $('.game-container')

		for (let i = 0; i < size; i++) {
			let rowDiv = $('<div></div>')
			rowDiv.addClass('grid-row')

			for (let j = 0; j < size; j++) {
				let cellDiv = $('<div></div>')
				cellDiv.addClass('grid-cell')
				rowDiv.append(cellDiv)
			}
			container.append(rowDiv)
		}
	}

	static addTileDiv (tile) {
		const tileDiv = $('<div></div>').addClass(`label ${HtmlHelper.getPositionsCssClass(tile.row, tile.col)} ${HtmlHelper.getValueCssClass(tile.value)}`)
		const container = this.getTileContainer()
		container.append(tileDiv)
	}

	static clearTileDivs(){
    let children = HtmlHelper.getTileContainer()
      .children()
      .remove()
	}

  static getGameContainer () {
    return $('.game-container')
  }

  static getTileContainer () {
	  return $('.tiles-grid')
  }

  static registerKeyEventHandler (interactor) {
		document.onkeydown = (e) => interactor.handleKeyEvent(e)
	}

	static getPositionsCssClass (row, col) {
		return `label-position-${row + 1}-${col + 1}`
	}

	static getValueCssClass (value) {
		return `label-value-${value}`
	}

	static setScore(score) {
		$('.score-container').html(`Score: ${score}`)
	}
}
