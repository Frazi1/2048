class LeaderBoardsHtmlHelper {
  static addGameResult (pos, player, score) {
    LeaderBoardsHtmlHelper.getLeaderBoardsContainer()
      .append(LeaderBoardsHtmlHelper.buildGameResultDiv(pos, player, score))
  }

  static buildGameResultDiv (pos, player, score) {
    const gameItemDiv = this.div().addClass('game-item')
    const positionDiv = this.div()
      .addClass('game-item-position')
      .append(`<span>${pos}</span>`)

    const playerNameDiv = this.div()
      .addClass('game-item-player-name')
      .append(`<span>${player}</span>`)

    const scoreDiv = this.div()
      .addClass('game-item-score')
      .append(`<span>${score}</span>`)

    gameItemDiv
      .append(positionDiv)
      .append(playerNameDiv)
      .append(scoreDiv)
    return gameItemDiv
  }

  static clearResults() {
    LeaderBoardsHtmlHelper.getLeaderBoardsContainer()
      .children()
      .remove()
  }

  static div () {
    return $(`<div></div>`)
  }

  static getLeaderBoardsContainer () {
    return $('.leaderboards-container')
  }
}