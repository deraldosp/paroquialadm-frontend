<template>
  <div>
    <div class="">

      <div class="row align-items-start">
        <div class="col-sm-12 col-md-4 col-lg-4 col-sm-6 mb-3">
          <div class="pa-card" style="height: 200px !important"><Target></Target></div>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-4 col-sm-6 mb-3">
          <div class="pa-card" style="height: 200px !important"><Methods></Methods></div>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-4 col-sm-6 mb-3">
          <div class="pa-card" style="height: 200px !important"><BalanceSheet></BalanceSheet></div>
        </div>
      </div>

      <div class="row mt-4 h-75">
        <div class="col-sm-12 col-lg-8 mb-3">
          <div class="pa-card">
            <b-list-group>
              <b-list-group-item v-for="(paroquiano, index) in listParoquianos" :key="index">{{ paroquiano.name }}</b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div class="col-sm-12 col-lg-4 mb-3">
          <div class="pa-card">
            <b-list-group>
              <b-list-group-item v-for="n in 11" :key="n">Lista item {{ n }}</b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Target from './Charts/Target'
import Methods from './Charts/Methods'
import BalanceSheet from './Charts/BalanceSheet'
import { Paroquianos } from 'services/dizimo.service'

  export default {
    components: {
      Target,
      Methods,
      BalanceSheet
    },

    data() {
      return {
        listParoquianos: [],
        loading: false
      }
    },

    mounted() {
      this.getParoquianos()
    },

    methods: {
      getParoquianos() {
        Paroquianos.get().then(res => {
          this.listParoquianos = res.data.data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>