/*
* @requires Game.js
* @requires HtmlHelper.js
* @requires Point.js
* @requires Interactor.js
 */

(function start () {
	let a = 10
	console.log(a)
	_.each(['1', 2, 3], i => console.log(i))

	const p = new Point(101, 101)
	console.log(p.col)
	HtmlHelper.buildGameField(4)
	const game = new Game(4)
	HtmlHelper.addTileDiv(game.spawnRandomTile())
	HtmlHelper.registerKeyEventHandler(new Interactor(game))
})()