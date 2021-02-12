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
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  methods: {
    updateGraphData(checkedList) {
      console.log(checkedList)
      let labels = []
      for(let coin of checkedList){
        labels.push(coin.asset_id)
      }
      
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: '# of votes',
            data: [15, 31, 5]
          }
        ]
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
