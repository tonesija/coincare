import axios from 'axios'

let baseURL = ''
console.log('Mode je: ' + process.env.NODE_ENV)
if(process.env.NODE_ENV == 'development'){
  baseURL = process.env.VUE_APP_ENV_BASE_URL_DEV
} else {
  baseURL = process.env.VUE_APP_ENV_BASE_URL_PROD
}

//connection to CoinAPI
export default () => {
  return axios.create({
    baseURL: baseURL
  })
}