/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise}
 */
const get = (url, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(url, {
                params: params
            })
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * post请求
 * @param url
 * @param params
 * @returns {Promise}
 */
const post = (url, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(url, params)
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * put请求
 * @param url
 * @param params
 * @returns {Promise}
 */
const put = (url, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.put(url, params)
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * delete请求
 * @param url
 * @param params
 * @returns {Promise}
 */
const del = (url, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(url, {
                data: params
            })
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}