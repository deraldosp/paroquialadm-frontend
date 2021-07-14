<template>
  <BaseView>
    <template #header>
      <div class="px-3 w-100 h-100 d-flex align-items-center">
        <div>
          <h5>Dizimistas</h5>
        </div>
      </div>
    </template>

    <b-container fluid>
        <FloatSearch @search="filterParoquianos"></FloatSearch>
      <div>
        <b-table
          hover
          :items="listParoquianos"
          :fields="fields"
        >
        <template v-slot:cell(actions)="{ item }">
          <b-button variant="primary" class="rounded-circle">
            <span @click="editParoquiano(item)" class="fas fa-edit"></span>
          </b-button>
        </template>
        </b-table>
        <infinite-loading :identifier="resetState" @infinite="infiniteHandler"></infinite-loading>
      </div>
    </b-container>
  </BaseView>
  
</template>

<script>
  import { Paroquianos } from 'services/dizimo.service'
  import FloatSearch from 'components/FloatSearch'

  export default {
    components: {
      Paroquianos,
      FloatSearch
    },

    data() {
      return {
        listParoquianos: [],
        loading: false,
        page: 1,
        resetState: 0,
        filter: {}
      }
    },

    computed: {
      fields() {
        return [
          {
            key: 'code',
            label: this.$t('CODE'),
            sortable: false
          },
          {
            key: 'name',
            label: this.$t('NAME'),
            sortable: false
          },
          {
            key: 'phone',
            label: this.$t('PHONE'),
            sortable: false
          },
          {
            key: 'celphone',
            label: this.$t('CELPHONE'),
            sortable: false,
          },
          {
            key: 'actions',
            label: '',
            sortable: false
          },
        ]
      }
    },

    mounted() {
      this.$root.$on('globalSearchFromHeader', (termSearch) => {
        this.filterParoquianos(termSearch)  
      })
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

</style>