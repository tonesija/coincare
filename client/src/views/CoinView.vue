<template>
  <div class="view-body">

    <section class="section">
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
    </section>

  </div>
</template>

<script>
import AssetsService from '../services/assetsService'
import PricesService from '../services/pricesService'

import Utility from '../utility/utilityFunctions'

import Chart from '../components/Chart'
export default {
  name: 'CoinView',

  data () {
    return {
      coin: {},

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
      this.updateGraphData()
    },
    async updateGraphData(){
      let asset_id = this.$route.params.asset_id

      let start_time = new Date( '2021-02-14 00:00' )
      Utility.updateDate(start_time, this.starting_date, this.starting_time)


      let data
      let datasets = []
      let labels = []
      try {
        data = await PricesService.getOneChartData(asset_id, this.asset_id_quote, start_time.toISOString(), this.period_id)
        
        for(let val of data){
          let date = new Date(val.time_period_start)
          labels.push(Utility.getTime(date, 'hours'))
        }

        data = Utility.selectFromArray(data, this.graphQuery)
        console.log(data)
      } catch(e) {
        this.errorMessage = e
      }
      datasets.push({
        label: asset_id,
        backgroundColor: Utility.getColor(),
        data: data
      })
      
      this.chartData = {
        labels: labels,
        datasets: datasets
      }
    }
  },

  created: async function(){
    this.coin = (await AssetsService.getAsset(this.$route.params.asset_id)).data[0]
    this.starting_date = Utility.getTodayAtMidnight()
    this.updateGraphData()
  },

  components: {
    Chart
  }
}
</script>

<style scoped>

</style>
