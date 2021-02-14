<template>
  <div class="view-body">

    <b-table
        :data="coins"
        :columns="columns"
        :checked-rows.sync="checkedCoins"
        checkable
        :checkbox-position="'left'"
        @check="updateGraphData">
    </b-table>

    <b-field grouped group-multiline>
      <b-field label="Time period">
        <b-select v-model="period_id" @input="onSelect">
            <option value="1MIN">1MIN</option>
            <option value="5MIN">5MIN</option>
            <option value="30MIN">30MIN</option>
            <option value="1HRS">1HRS</option>
            <option value="2HRS">2HRS</option>
            <option value="1DAY">1DAY</option>
        </b-select>
      </b-field>

      <b-field label="Quote">
        <b-select v-model="asset_id_quote">
            <option value="USD">USD</option>
        </b-select>        
      </b-field> 

      <b-field label="By trade">
        <b-select v-model="graphQuery" @input="onSelect">
            <option value="price_close">Last trade</option>
            <option value="price_open">First trade</option>
            <option value="price_low">Lowest trade</option>
            <option value="price_high">Highest trade</option>
        </b-select>
      </b-field>

      <b-field label="Starting time:">
        <b-field>
          <b-datepicker
              @input="onSelect"
              placeholder="Type or select a date..."
              icon="calendar-today"
              editable
              v-model="starting_date">
          </b-datepicker>
        </b-field>
        <b-field>
          <b-timepicker
              rounded
              @input="onSelect"
              placeholder="Click to select..."
              icon="clock"
              :enable-seconds="false"
              v-model="starting_time">
          </b-timepicker>
        </b-field>
      </b-field>
    </b-field>

    <chart :chart-data="chartData"
      :height="200">
    </chart>

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
      starting_time: null,
      starting_date: null,

      graphQuery: 'price_close',

      chartData: {
        labels: [],
        datasets: []
      },

      errorMessage: null
    }
  },

  methods: {
    onSelect() {
      this.updateGraphData(null)
    },

    async updateGraphData(checkedList) {

      if(!checkedList) checkedList = this.checkedCoins
      console.log('Updating graph', checkedList)
      let asset_id_bases = []
      for(let coin of checkedList){
        asset_id_bases.push(coin.asset_id)
      }

      let start_time = new Date( '2021-02-14 00:00' )
      Utility.updateDate(start_time, this.starting_date, this.starting_time)

      let mapOfData
      try{
        mapOfData = await PricesService.getChartData(asset_id_bases, this.asset_id_quote, start_time.toISOString(), this.period_id)
      } catch(e){
        this.errorMessage = e
      }
      
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
      if(tmpKey) for(let val of mapOfData[tmpKey]){
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
    this.starting_date = Utility.getTodayAtMidnight()
  },

  components: {
    Chart
  }
}
</script>

<style scoped>
 
</style>
