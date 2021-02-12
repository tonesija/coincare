import api from './api'


export default {
    async getChartData (asset_id_bases, asset_id_quote, time_start, period_id) {
        let apiCallsRemaining = asset_id_bases.length
        let toReturn = new Map()
        for(let asset_id_base of asset_id_bases){
            toReturn[asset_id_base] = []
            let url = 'v1/ohlcv/'+asset_id_base+'/'+
            asset_id_quote+'/history'
            api().get(url, {params: {period_id: period_id,
                time_start: time_start,
                apikey: process.env.VUE_APP_ENV_APIKEY}}).then((res) => {
                    apiCallsRemaining--
                    toReturn[asset_id_base].push(res.data)
                    if(apiCallsRemaining == 0){
                        return toReturn
                    }
                }).catch(err => {
                    console.log(err)
                    return null
                })
        } 
    }
}
