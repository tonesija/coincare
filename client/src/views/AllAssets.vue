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

      <b-table-column field="asset_id" label="ID" sortable searchable width="240">
          <template
              #searchable="props">
              <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Search..."
                  icon="magnify"
                  size="is-small" />
          </template>
          <template v-slot="props">
              <span class="tag is-primary">
                {{ props.row.asset_id }}
              </span>
          </template>

      </b-table-column>

        <b-table-column field="name" label="Coin name" sortable searchable>
          <template
              #searchable="props">
              <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Search..."
                  icon="magnify"
                  size="is-small" />
          </template>
          <template v-slot="props">
              {{ props.row.name }}
          </template>
      </b-table-column>

      <b-table-column field="price_usd" label="Price" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.price_usd.toFixed(2) }} $
          </span>
      </b-table-column>

      <b-table-column field="volume_1hrs_usd" label="Volume (1 hour)" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.volume_1hrs_usd.toFixed(2) }} $
          </span>
      </b-table-column>

      <b-table-column field="volume_1day_usd" label="Volume (1 day)" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.volume_1day_usd.toFixed(2) }} $
          </span>
      </b-table-column>

      <b-table-column field="volume_1mth_usd" label="Volume (1 month)" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.volume_1mth_usd.toFixed(2) }} $
          </span>
      </b-table-column>

      <b-table-column field="type_is_crypto" label="Is crypto" sortable numeric v-slot="props">
          <span class="">
              {{ props.row.type_is_crypto ? true : false }}
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
