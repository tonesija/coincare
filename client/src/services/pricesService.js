import api from './api'

/*function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/

export default {
    async getChartData (asset_id_bases, asset_id_quote, time_start, period_id) {
        let toReturn = new Map()
        for(let asset_id_base of asset_id_bases){
            toReturn[asset_id_base] = []
            let url = 'v1/ohlcv/'+asset_id_base+'/'+
            asset_id_quote+'/history'


            let data = (await api().get(url, {params: {period_id: period_id,
                time_start: time_start, limit: process.env.VUE_APP_ENV_LIMIT,
                apikey: process.env.VUE_APP_ENV_APIKEY}})).data
            console.log('data: ', data)
            toReturn[asset_id_base] = toReturn[asset_id_base].concat(data)
            
        }
        return toReturn
    },

    async getOneChartData (asset_id_base, asset_id_quote, time_start, period_id) {
        let url = 'v1/ohlcv/'+asset_id_base+'/'+
        asset_id_quote+'/history'

        return (await api().get(url, {params: {period_id: period_id,
            time_start: time_start, limit: process.env.VUE_APP_ENV_LIMIT,
            apikey: process.env.VUE_APP_ENV_APIKEY}})).data
    }
}
