<template>
    <BaseView>
      <template #header>
        <div class="px-3 w-100 h-100 d-flex align-items-center justify-content-between">
          <div class="d-flex">
            <i class="material-icons mr-2">cloud_circle</i><h5>{{ $t('dbIntegrations') }}</h5>
          </div>
          <div>
            <b-button @click="openModalDbIntegration()" variant="primary"><i class="fas fa-plus mr-2"></i>{{ $t('NEW_CONNECTION')}}</b-button>
          </div>
        </div>
      </template>

      <b-container fluid>
        <div>
          <b-table
            ref="table"
            
            hover
            :items="dbIntegrations"
            :fields="fields"
            :selectable="true"
            select-mode="single"
            @row-selected="selectIntegration"
          >
          <template v-slot:cell(actions)="{ item }">
            <b-button variant="primary" class="rounded-circle">
              <span @click="editDbIntegration(item.id)" class="fas fa-edit"></span>
            </b-button>

            <b-button variant="info" class="rounded-circle">
              <span @click="testConnection(item)" class="fas fa-wifi" v-if="!loadingTests[item.id]"></span>
              <span @click="testConnection(item)" class="fas fa-spinner fa-pulse" v-if="loadingTests[item.id]"></span>
            </b-button>

            <b-button variant="danger" class="rounded-circle">
              <span @click="deleteConnection(item.id)" class="fas fa-trash"></span>
            </b-button>
          </template>
         
          </b-table>
          <infinite-loading :identifier="resetState" @infinite="infiniteHandler"></infinite-loading>
        </div>        
      </b-container>
      <ModalDbIntegration @save="saveIntegration" />
    
    </BaseView>
</template>

<script>
  import ModalDbIntegration from './modalIntegration'
  import { DbIntegration } from 'services/general.service'

    export default {
        components: {
          ModalDbIntegration
        },

        data() {
          return {
            dbIntegrations: [],
            selectedIntegration: null,
            loading: false,
            page: 1,
            resetState: 0,
            filter: {},
            loadingTests: {}
          }
        },

        computed: {
          fields() {
            if (this.$store.state.currentDeviceDisplay !== 'smartphone') {

              return [
                {
                  key: 'name',
                  label: this.$t('NAME'),
                  sortable: false
                },
                {
                  key: 'driver',
                  label: this.$t('DRIVER'),
                  sortable: false
                },
                {
                  key: 'server',
                  label: this.$t('HOST'),
                  sortable: false
                },
                {
                  key: 'port',
                  label: this.$t('PORT'),
                  sortable: false
                },
                {
                  key: 'db_user',
                  label: this.$t('CELPHONE'),
                  sortable: false,
                },
                {
                  key: 'actions',
                  label: '',
                  sortable: false
                },
              ]
            } else {
              return [
                {
                  key: 'name',
                  label: this.$t('Dizimista'),
                  sortable: false
                }
              ]
            }
          }
        },

        methods: {

          /**
           * Infinite Loading starts
           */
          infiniteHandler($state) {
            this.getDbIntegrations($state)
          },

          /**
           * Get Db Integrations List
           */
          getDbIntegrations(infiniteState) {

            let params = {
              page: this.page,
              ...this.filter
            }

            DbIntegration.get(null, params).then(res => {
              if (res.data.data.length) {
                this.page += 1
                this.dbIntegrations.push(...res.data.data)
                infiniteState.loaded()
              } else {
                infiniteState.complete()
              }
            })
          
          },

          saveIntegration(data) {
            alert(data)
          },

          openModalDbIntegration() {
            this.$bvModal.show('modalDbIntegration')
          },

          selectIntegration(item) {
            this.selectedIntegration = item.shift() || {}
          },

          editDbIntegration(id) {
            console.log('Todo: implementar edição')
          },

          testConnection(data) {

            if (!(data.id in this.loadingTests)) {
              this.$set(this.loadingTests, data.id, true)
            } else {
              this.loadingTests[data.id] = true
            } 

            DbIntegration.testConnection(data).then(res => {
              if (res.data.connected) {
                this.$notify({
                  msg: 'Conexão bem sucedida!',
                  type: 'success'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.loadingTests[data.id] = false
            })
          }

        }
    }
</script>

<style lang="scss" scoped>

</style>