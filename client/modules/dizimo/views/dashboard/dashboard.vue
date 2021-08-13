<template>
  <BaseView headerHidden :bgColor="'transparent'">
    <div>

      <div class="row mx-0 align-items-start">
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

      <div class="row mx-0 mt-2">
        <div class="col-sm-12 col-lg-8 mb-3">
          <b-row>
            <b-col col xl="6" lg="12" sm="12" class="mt-1">
              <DateCard @dateChanged="setEntries" :editable="false" time="07:30" :title="'Missa 07:30'">
                Registro de pagamento de dízimo por missa
              </DateCard>
              
            </b-col>
            <b-col col lg="6" sm="12" class="mt-1">
              <DateCard variant="success" :editable="true" :title="'Secretaria'">
                <small>
                  Dízimo recebido na secretaria, com cartão, depósito ou cheque.
                </small>
              </DateCard>
            </b-col>
          
           
            <b-col col lg="6" sm="12" class="mt-1">
              <DateCard :editable="false" time="09:30" :title="'Missa 09:30'">
                Registro de pagamento de dízimo por missa
              </DateCard>
            </b-col>
            
            <b-col col lg="6" sm="12" class="mt-1">
              <DateCard :editable="false" time="18:30" :title="'Missa 18:30'">
                Registro de pagamento de dízimo por missa
              </DateCard>
            </b-col>
        
          </b-row>
          <!-- <ButtonDashboard 
            @click="createDizimista()"
            :title="$t('ADD_TITHE')" 
            classIcon="fas fa-user-plus"
          ></ButtonDashboard> -->
        </div>
        <div class="col-sm-12 col-lg-4 mb-3">
          <div class="pa-card">
            <div class="my-0">
              <b-list-group>
                <div class="">
                  <FloatSearch @search="filterParoquianos"></FloatSearch>
                  <div class="my-0 first-list">
                    <b-list-group>
                      <b-list-group-item @dblclick="editDizimista(paroquiano.id)" style="font-size: 14px" v-for="(paroquiano, index) in listParoquianos" :key="index">{{ paroquiano.name }}</b-list-group-item>
                    </b-list-group>
                    <infinite-loading :identifier="resetState" @infinite="infiniteHandler"></infinite-loading>
                  </div>
                </div>
              </b-list-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseView>
</template>

<script>
import Target from './Charts/Target'
import Methods from './Charts/Methods'
import BalanceSheet from './Charts/BalanceSheet'
import { Paroquianos } from 'services/dizimo.service'
import FloatSearch from 'components/FloatSearch'
import ButtonDashboard from 'components/ButtonDashboard'
import DateCard from 'components/DateCard'

  export default {
    components: {
      Target,
      Methods,
      BalanceSheet,
      FloatSearch,
      ButtonDashboard,
      DateCard
    },

    data() {
      return {
        dateLancSecretaria: null,
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
      },

      editDizimista(id) {
        this.$router.push({name: 'DIZIMISTAS_EDIT', params: { id }})
      },

      createDizimista() {
        this.$router.push({name: 'DIZIMISTAS_NEW'})
      },

      setEntries(obj) {
        this.$store.dispatch('dizimo/setCurrentTimeEntries', obj).then(() =>{
          this.$router.push({ name: "DIZIMO_ENTRIES", params: { date: obj.date, time: obj.time } })
        })
        console.log(obj)
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