<template>
  <div class="view-body">

    <b-table
        :data="coins"
        :loading="loading"
        :paginated="true"
        :per-page="20"
        :default-sort-direction="'asc'"
        narrowed
        striped
        hoverable>

      <b-table-column field="asset_id" label="ID" sortable searchable v-slot="props" width="120">
          <span class="tag is-primary">
              {{ props.row.asset_id }}
          </span>
      </b-table-column>

            <b-table-column field="name" label="Coin name" sortable searchable v-slot="props">
          <span class="">
              {{ props.row.name }}
          </span>
      </b-table-column>

      <b-table-column field="price_usd" label="Price (USD)" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.price_usd }}
          </span>
      </b-table-column>

      <b-table-column field="volume_1hrs_usd" label="Volume traded within 1 hour (USD)" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.volume_1hrs_usd }}
          </span>
      </b-table-column>

      <b-table-column field="volume_1day_usd" label="Volume traded within 1 day (USD)" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.volume_1day_usd }}
          </span>
      </b-table-column>

      <b-table-column field="volume_1mth_usd" label="Volume traded within 1 month (USD)" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.volume_1mth_usd }}
          </span>
      </b-table-column>

      <b-table-column field="type_is_crypto" label="Is cryptocurrency" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.type_is_crypto }}
          </span>
      </b-table-column>
    </b-table>

  </div>
</template>

<script>
import AssetsService from '../services/assetsService'

export default {
  name: 'AllAssets',

  data () {
    return {
      coins: [],
      columns: [
        {
          field: 'asset_id',
          label: 'ID',
          width: 120,
          sortable: true,
          searchable: true
        },
        {
          field: 'name',
          label: 'Coin name',
          sortable: true,
          searchable: true
        },
        {
          field: 'price_usd',
          label: 'Price ($)',
          numeric: true,
          sortable: true
        },
        {
          field: 'volume_1hrs_usd',
          label: 'Volume traded within 1 hour (USD)',
          numeric: true,
          sortable: true
        },
        {
          field: 'volume_1day_usd',
          label: 'Volume traded within 1 day (USD)',
          numeric: true,
          sortable: true
        },
        {
          field: 'volume_1mth_usd',
          label: 'Volume traded within 1 month (USD)',
          numeric: true,
          sortable: true
        },
        {
          field: 'type_is_crypto',
          label: 'Is cryptocurrency',
          sortable: true
        }
      ],

      loading: true
    }
  },

  methods: {
  },

  created: async function(){
    this.coins = (await AssetsService.getAllAssets()).data
    this.loading = false
  },

  components: {
  }
}
</script>

<style scoped>

</style>
