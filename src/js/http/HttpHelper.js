'use strict';

const serverUrl = "http://localhost:8000/api"

class HttpHelper {
  static buildReq(method, path, queryParams) {
    let url = `${serverUrl}${path}`
    if(queryParams)
      url += `?${queryParams}`

    let xmlHttpRequest = new XMLHttpRequest
    xmlHttpRequest.open(method, url,  true)
    return xmlHttpRequest
  }

  static savePlayerScore(name, score){
    const req = HttpHelper.buildReq('POST', '/players', `name=${name}&score=${score}`)
    req.send()
  }
}
