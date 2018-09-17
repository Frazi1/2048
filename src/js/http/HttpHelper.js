'use strict';

const serverUrl = "http://localhost:8000/api"

class HttpHelper {
  static buildReq(method, path, queryParams, callback) {
    let url = `${serverUrl}${path}`
    if(queryParams)
      url += `?${queryParams}`

    let xmlHttpRequest = new XMLHttpRequest
    xmlHttpRequest.onreadystatechange = function () {
      if(callback && this.readyState === 4)
        callback(xmlHttpRequest)
    }
    xmlHttpRequest.open(method, url,  true)

    return xmlHttpRequest
  }

  static savePlayerScore(name, score, callback){
    const req = HttpHelper.buildReq('POST', '/players', `name=${name}&score=${score}`, callback)
    req.send()
  }

  static getLeaderBoards(callback) {
    const req = HttpHelper.buildReq('GET', '/games', 'top=100', callback)
    req.send()
    return req
  }
}
