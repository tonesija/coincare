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
      console.log(checkedList)
      let asset_id_bases = []
      for(let coin of checkedList){
        asset_id_bases.push(coin.asset_id)
      }

      let mapOfData = await PricesService.getChartData(asset_id_bases, this.asset_id_quote,20210212, this.period_id)
      console.log(await PricesService.getChartData(asset_id_bases, this.asset_id_quote,20210212, this.period_id))
      console.log(mapOfData)
      let datasets = []
      for(let key in mapOfData){
        console.log(key)
        datasets.push({label: key,
        data: mapOfData[key]})
      } 
      this.chartData = {
        labels: asset_id_bases,
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
