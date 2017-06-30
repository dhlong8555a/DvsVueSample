import ajaxRest from './ajaxBase'

const CONTROLLER_PREFIX = '/projectcontroller'
// const _isDev = process.env.NODE_ENV !== 'production'

function listPrj (wpsID, offset, count) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `${CONTROLLER_PREFIX}/all/projects`,
      method: 'GET',
      data: {
        workspaceId: wpsID,
        startNum: offset,
        count: count
      }
    }

    ajaxRest(params).then(resp => {
      resolve(resp.data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}

function addPrj (wspID, {name, desc, active}) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `${CONTROLLER_PREFIX}/projects`,
      method: 'POST',
      data: {
        workspaceId: wspID,
        name: name,
        description: desc,
        active: active
      }
    }

    ajaxRest(params).then(resp => {
      resolve(resp.data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}

function updatePrj (wspID, {id, name, desc, active}) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `${CONTROLLER_PREFIX}/projects`,
      method: 'PUT',
      data: {
        workspaceId: wspID,
        id: id,
        name: name,
        description: desc,
        active: active
      }
    }

    ajaxRest(params).then(resp => {
      resolve(resp.data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}

function getActivePrjs (wspID) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `${CONTROLLER_PREFIX}/bystatus/projects`,
      method: 'GET',
      data: {
        workspaceId: wspID,
        active: true
      }
    }

    ajaxRest(params).then(resp => {
      resolve(resp.data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}

export default { listPrj, addPrj, updatePrj, getActivePrjs }
