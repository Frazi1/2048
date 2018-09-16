/*
* @requires Game.js
* @requires HtmlHelper.js
* @requires Point.js
* @requires Interactor.js
 */
'use strict';

(function start () {
  let size = 4
  HtmlHelper.buildGameField(size)
  // HtmlHelper.addTileDiv(game.spawnRandomTile())
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(0,0,2)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(0,0,2)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(0,1,4)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(0,2,8)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(0,3,16)))
  //
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(1,0,32)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(1,1,64)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(1,2,128)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(1,3,256)))
  //
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(2,0,512)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(2,1,1024)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(2,2,2048)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(2,3,4096)))
  //
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(3,0,2)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(3,1,4)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(3,2,8)))
  // HtmlHelper.addTileDiv(game.spawnTile(new Tile(3,3,16)))
  // testVerticalNoMoveMerge(game)
  let interactor = new Interactor()
  HtmlHelper.registerKeyEventHandler(interactor)
  startNewGame(interactor, size)

  $('.btn-new-game').click(() => startNewGame(interactor, size))
})()

function testVerticalNoMoveMerge (game) {
  HtmlHelper.addTileDiv(game.spawnTile(new Tile(2, 0, 2)))
  HtmlHelper.addTileDiv(game.spawnTile(new Tile(3, 0, 2)))
}

function startNewGame (interactor, size) {
  interactor.game = new Game(size)
  interactor.addRandomTile()
  interactor.addRandomTile()
  interactor.draw()
}