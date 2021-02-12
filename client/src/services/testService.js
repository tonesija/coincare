import api from './api'

export default {
    test () {
        return api().get('v1/exchanges', {params: {apikey: process.env.VUE_APP_ENV_APIKEY}})
    }
}

