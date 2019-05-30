/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise}
 */
import axios from "axios";
import qs from 'qs';
import TOKEN from '../store/state'
axios.defaults.headers.post['Authorization'] = TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(function (response){
    // 处理响应数据
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, function (error){
    // 处理响应失败
    return Promise.reject(error);
});
// export function get(url, params){
//     return new Promise((resolve, reject) =>{
//         axios.get(url, {
//             params: params
//         }).then(res => {
//             resolve(res.data);
//         }).catch(err =>{
//             reject(err.data)
//         })
//     });
// }
/**
 * post请求
 * @param url
 * @param params
 * @returns {Promise}
 */

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify((params)))
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
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