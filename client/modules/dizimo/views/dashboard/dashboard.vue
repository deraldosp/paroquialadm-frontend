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

      <div class="row mt-2">
        <div class="col-sm-12 col-lg-8 mb-3">
          <div class="pa-card py-3">
            <FloatSearch @search="filterParoquianos"></FloatSearch>
            <div class="my-0 first-list">
              <b-list-group>
                <b-list-group-item v-for="(paroquiano, index) in listParoquianos" :key="index">{{ paroquiano.name }}</b-list-group-item>
              </b-list-group>
              <infinite-loading :identifier="resetState" @infinite="infiniteHandler"></infinite-loading>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-4 mb-3">
          <div class="pa-card">
            <div class="my-0 first-list">
              <b-list-group>
                <b-list-group-item v-for="n in 11" :key="n">Lista item {{ n }}</b-list-group-item>
              </b-list-group>
            </div>
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
import FloatSearch from 'components/FloatSearch'

  export default {
    components: {
      Target,
      Methods,
      BalanceSheet,
      FloatSearch
    },

    data() {
      return {
        listParoquianos: [],
        loading: false,
        page: 1,
        filter: {},
        resetState: 0
      }
    },

    mounted() {
      // this.getParoquianos()
    },

    methods: {
      infiniteHandler($state) {
        this.getParoquianos($state)
      },

      getParoquianos(infiniteState) {

        let params = {
          page: this.page,
          ...this.filter
        }

        Paroquianos.get(null, params).then(res => {
          if (res.data.data.length) {
            this.page += 1
            this.listParoquianos.push(...res.data.data)
            infiniteState.loaded()
          } else {
            infiniteState.complete()
          }
        })
      
      },

      filterParoquianos(val) {
        this.filter = {
          name: val
        }
          this.listParoquianos = []
          this.page = 1
          this.resetState++
      }
    }
  }
</script>

<style lang="scss" scoped>
.first-list {
  height: calc(100vh - 380px);
  overflow: hidden auto;
}
</style>