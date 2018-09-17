/*
 * @requires ../http/HttpHelper.js
 * @requires LeaderBoardsHtmlHelper.js
 */
'use strict'

class LeaderBoardsInteractor {
  loadLeaderBoards () {
    LeaderBoardsHtmlHelper.clearResults()
    HttpHelper.getLeaderBoards((req) => {
      const res = JSON.parse(req.response)
      _(res).forEach((gameResult) => LeaderBoardsHtmlHelper.addGameResult(
        gameResult.position,
        gameResult.playerName,
        gameResult.score))
    })
  }
}