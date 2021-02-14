import axios from 'axios'

console.log('Mode je: ' + process.env.NODE_ENV)
let baseURL = process.env.VUE_APP_ENV_BASE_URL
console.log('BaseURL za CoinAPI je: ' + baseURL)

//connection to CoinAPI
export default () => {
  return axios.create({
    baseURL: baseURL
  })
}