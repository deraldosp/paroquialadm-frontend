<template>
  <div>
    <BaseView>
      <template #header>
        <div class="px-3 w-100 h-100 d-flex align-items-center justify-content-between">
          <div>
            <h5>{{ $t('Dizimistas') }}</h5>
          </div>
          <div>
            <b-button @click="createDizimista()" variant="primary"><i class="fas fa-plus mr-2"></i>{{ $t('NEW')}}</b-button>
          </div>
        </div>
      </template>

      <b-container fluid>
        <div>
          <b-table
            ref="table"
            
            hover
            :items="listParoquianos"
            :fields="fields"
            :selectable="true"
            select-mode="single"
            @row-selected="selectDizimista"
          >
          <template v-slot:cell(actions)="{ item }">
            <b-button variant="primary" class="rounded-circle">
              <span @click="editParoquiano(item.id)" class="fas fa-edit"></span>
            </b-button>
          </template>
         
          </b-table>
          <infinite-loading :identifier="resetState" @infinite="infiniteHandler"></infinite-loading>
        </div>
      </b-container>
    </BaseView>
    
    <SidebarRight @closed="clearSelected"  ref="sidebar" :active="showSidebar">
      <template #title>
        <div class="d-flex">
          <h5>Cadastro de Dizimista <span class="badge badge-secondary">#{{ selectedDizimista.code }}</span></h5>
          <button @click="toggleEdit()" class="btn btn-light p-0 ml-2">
            <span class="material-icons-outlined" :class="{'text-success': editMode}">mode_edit</span>
          </button>
        </div>
        
      </template>
      <FormDizimistaSidebar
        :editable="editMode"
        v-if="!isEmpty(selectedDizimista)" 
        :form="selectedDizimista"
      ></FormDizimistaSidebar>
    </SidebarRight>
  </div>
  
</template>

<script>
  import { Paroquianos } from 'services/dizimo.service'
  import SidebarRight from 'components/SidebarRight'
  import FormDizimistaSidebar from './FormDizimistaSidebar'
  import { isEmpty } from 'lodash'

  export default {
    components: {
      Paroquianos,
      SidebarRight,
      FormDizimistaSidebar
    },

    data() {
      return {
        listParoquianos: [],
        loading: false,
        page: 1,
        resetState: 0,
        filter: {},
        selectedDizimista: null,
        showSidebar: false,
        isEmpty: isEmpty,
        editMode: false
      }
    },

    computed: {
      fields() {
        if (this.$store.state.currentDeviceDisplay !== 'smartphone') {

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
        } else {
          return [
            {
              key: 'name',
              label: this.$t('Dizimista'),
              sortable: false
            }
          ]
        }
      },
    },

    mounted() {
      this.$root.$on('globalSearchFromHeader', (termSearch) => {
        this.filterParoquianos(termSearch)  
      })
    },


    methods: {
      editParoquiano(id) {
        console.log(id)
        this.$router.push({ name: 'DIZIMISTAS_EDIT', params: { id: id }})
      },

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

      createDizimista() {
        this.$router.push({name: 'DIZIMISTAS_NEW'})
      },

      selectDizimista(item) {
        this.selectedDizimista = item.shift() || {}
        this.$nextTick(() => {
          if (!isEmpty(this.selectedDizimista)) {
            this.$refs.sidebar.show()
          } else {
            this.$refs.sidebar.close()
          }
        })
        console.log(this.selectedDizimista)
      },

      clearSelected() {
        this.$refs.table.clearSelected()
      },

      toggleEdit() {
        this.editMode = !this.editMode
      }
    }
  }
</script>
