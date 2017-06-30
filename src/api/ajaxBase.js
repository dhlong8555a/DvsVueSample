import axios from 'axios'

const DEVOPS_REST_PREFIX = '/devops'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

function ajaxRest ({url, method, data = {},
                    timeout = {server: 5000, client: 5000},
                    pathPrefix = DEVOPS_REST_PREFIX}) {
  let p = new Promise((resolve, reject) => {
    let urlParams = {}
    let bodyData = {}
    if (method === 'GET') {
      urlParams = {_now: Date.now(), ...data}
    } else bodyData = data

    let config = {
      url: `${pathPrefix}${url}`,
      // baseURL: 'http://172.21.84.247:8080',
      method: method,
      params: urlParams,
      data: bodyData,
      timeout: timeout.client
    }

    axios.request(config).then(resp => {
      resolve(resp)
    }).catch(error => {
      reject(error)
    })
  })

  return p
}

export default ajaxRest
