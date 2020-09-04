import axios from 'axios'
import qs from 'qs'
// import { LocalStorage } from 'quasar'

// const took = () => {
//   const token2 = localStorage.getItem('dataadmin')
//   const token3 = localStorage.getItem('datauser')
//   const token4 = localStorage.getItem('dataperusahaan')
//   if (token2 !== null) {
//     return {
//       'x-access-token': token2
//     }
//   } else if (token2 === null) {
//     if (token3 !== null) {
//       return {
//         'x-access-token': token3
//       }
//     } else if (token3 === null) {
//       return {
//         'x-access-token': token4
//       }
//     }
//   }
// }

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: 'http://127.0.0.1:3000',
  // baseURL: 'http://45.249.216.239:3000',
  headers: {
  }
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
