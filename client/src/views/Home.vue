<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p v-if="val">{{val}}</p>
  </div>
</template>

<script>
import TestService from '../services/testService'
export default {
  name: 'Home',

  data () {
    return {
      val: null,
      url: process.env.VUE_APP_ENV_BASE_URL_DEV
    }
  },

  methods: {
  },

  created: async function(){
        console.log('ee', this.url)

    this.val = await TestService.test(this.apikey)
  },

  components: {
    
  }
}
</script>
