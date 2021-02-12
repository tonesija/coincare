import api from './api'
import FilterAssets from '../utility/filterAssets'

export default {
    getAssets () {
        return api().get('v1/assets', {params: {filter_asset_id: FilterAssets, apikey: process.env.VUE_APP_ENV_APIKEY}})
    },

    getAllAssets () {
        return api().get('v1/assets', {params: {apikey: process.env.VUE_APP_ENV_APIKEY}})
    }
}

