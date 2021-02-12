<template>
  <div class="view-body">

    <b-table class="mytable"
        :data="coins"
        :columns="columns"
        :checked-rows.sync="checkedCoins"
        checkable
        :checkbox-position="'left'"
        @check="updateGraphData">
    </b-table>

    <chart :chart-data="chartData"></chart>

  </div>
</template>

<script>
import AssetsService from '../services/assetsService'
import PricesService from '../services/pricesService'

import Utility from '../utility/utilityFunctions'

import Chart from '../components/Chart'
export default {
  name: 'Home',

  data () {
    return {
      coins: [],
      checkedCoins: [],
      columns: [
        {
          field: 'asset_id',
          label: 'ID',
          width: 40
        },
        {
          field: 'name',
          label: 'Coin name',
          centered: true
        },
        {
          field: 'price_usd',
          label: 'Price ($)',
          numeric: true
        }
      ],

      period_id: '1HRS',
      asset_id_quote: 'USD',

      graphQuery: 'price_close',

      chartData: {
        labels: ['Red', 'Green', 'Blue'],
        datasets: [{
          label: '# of votes',
          data: [15, 14, 5]
        }]
      }
    }
  },

  methods: {
    async updateGraphData(checkedList) {
      console.log('Updating graph', checkedList)
      let asset_id_bases = []
      for(let coin of checkedList){
        asset_id_bases.push(coin.asset_id)
      }

      let mapOfData = await PricesService.getChartData(asset_id_bases, this.asset_id_quote,20210212, this.period_id)
      
      let datasets = []
      let tmpKey
      for(let key in mapOfData){
        let data = Utility.selectFromArray(mapOfData[key], this.graphQuery)
        console.log('data: ', mapOfData[key])
        datasets.push({label: key,
          backgroundColor: Utility.getColor(),
          data: data})
        tmpKey = key
      }

      let labels = []
      for(let val of mapOfData[tmpKey]){
        let date = new Date(val.time_period_start)
        labels.push(Utility.getTime(date, 'hours'))
      }
      this.chartData = {
        labels: labels,
        datasets: datasets
      }
    }
  },

  created: async function(){
    this.coins = (await AssetsService.getAssets()).data
  },

  components: {
    Chart
  }
}
</script>

<style scoped>
  .mytable {
    overflow-x: hidden;
  }
</style>
