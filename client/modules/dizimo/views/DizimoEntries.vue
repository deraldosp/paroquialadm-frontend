<template>
  <BaseView headerHidden :title="$t('Lancamentos Dízimo')">
    <div class="row mx-0 h-100">
      <div class="col-lg-3 col-md-4 col-sm-12 col-entry-form">
        <div class="form-entry">
          <DateCard :date="date" :title="'Missa 07:30'" :time="'07:30'" no-action>Lançamentos</DateCard>
          <ValidationObserver ref="observer">
            <b-form-group>
              <div class="mb-3">
                <label for="">Dizimista</label>
                <ValidationProvider name="Dizimista" rules="required" v-slot="{ errors }">
                  <v-select
                  :options="listDizimistas"
                  label="name"
                  :reduce="item => item.id"
                  v-model="model.dizimistaSelected"
                  :filterBy="filterDizimista"
                  >
                    <template #option="{ code, name }">
                      <em>{{ code }} - {{ name }}</em>
                    </template>
                  
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div>
                <label for="">Referência</label>
                <ValidationProvider name="Referência" rules="required" v-slot="{ errors }">
                  <b-form-checkbox-group
                    v-model="model.monthsSelected"
                    :options="monthsEntry"
                    text-field="label"
                  ></b-form-checkbox-group>
                  <small class="text-danger mb-3">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="d-flex align-items-end mb-3">
                <div class="mr-2">
                  <label for="Valor"></label>
                  <ValidationProvider name="Valor" rules="required" v-slot="{ errors }">
                    <v-money class="form-control" v-model="model.entryValue" v-bind="money"></v-money>  
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div><b-button @click="addEntry()" variant="outline-primary">incluir</b-button></div>
              </div>

              <div>
                <b-table 
                  striped 
                  hover
                  small
                  :items="model.entries"
                  :fields="tableFields"
                >
                
                  <template #cell(actions)="{ index, item }">
                    <i @click="removeEntry(index, item)" class="fas fa-trash"></i>
                  </template>
                
                </b-table>
              </div>
              <div class="h4 text-success text-right">$ {{ totalEntry.toFixed(2) }}</div>
              <b-button :disabled="model.entries.length == 0 || totalEntry == 0" variant="primary" class="w-100 mt-auto">Registrar Dízimo</b-button>
            </b-form-group>
          </ValidationObserver>
        </div>
      </div>
      
      <div class="col-lg-9 col-md-8 col-sm-12">
      </div>
    </div>
  </BaseView>
</template>

<script>
  import { DateTime, Info } from 'luxon'
  import DateCard from 'components/DateCard'
  import { Money } from 'v-money'
  import { Paroquianos } from 'services/dizimo.service'
  
  
  export default {
    components: {
      DateCard,
      vMoney: Money
    },

    props: {
      date: {
        type: String,
        required: true,
        validator: function (value) {
          let pattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
          return pattern.test(value)
        }
      },

      time: {
        type: String,
        validator: function (value) {
          let pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
          return pattern.test(value)
        }
      },
    },

    data() {
      return {
        model: {
          entryValue: 0,
          monthsSelected: [DateTime.now().toFormat('L')],
          dizimistaSelected: null,
          entries: []
        },
        
        tableFields: [
          {
            key: 'year',
            sortable: true,
            label: this.$t('YEAR')
          },
          {
            key: 'month',
            sortable: true,
            label: this.$t('MONTH'),
            formatter: (value) => {
              let month = this.monthsEntry.find(item => item.value == value)
              return month.label
              
            }
          },
          {
            key: 'value',
            label: this.$t('VALUE'),
            sortable: true,
            formatter: (value) => {
              return value.toFixed(2)
            }
          },
          {
            key: 'actions',
            label: this.$t(''),
            sortable: false
          }
        ],
        
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          precision: 2,
          masked: false
        },
        monthsEntry: [
          { label: 'Jan', value: 1 },
          { label: 'Fev', value: 2 },
          { label: 'Mar', value: 3 },
          { label: 'Abr', value: 4 },
          { label: 'Mai', value: 5 },
          { label: 'Jun', value: 6 },
          { label: 'Jul', value: 7 },
          { label: 'Ago', value: 8 },
          { label: 'Set', value: 9 },
          { label: 'Out', value: 10 },
          { label: 'Nov', value: 11 },
          { label: 'Dez', value: 12 },
          { label: '13o', value: 13 }
        ],
        filterDizimista: (option, label, search) => {
          let temp = search.toLowerCase();
          return option.code.toString().toLowerCase().indexOf(temp) > -1 || 
          option.name.toLowerCase().indexOf(temp) > -1
        },
        
        listDizimistas: [],

      }
    },

    computed: {
      currentTime() {
        return this.$store.state.dizimo.currentTimeEntries
      },

      listMonth() {
        return Info.months("short", { locale: this.$i18n.locale.substr(-2) })
      },

      totalEntry() {
        let total = this.model.entries.reduce((total, entry) => total + entry.value, 0)
        return total
      }
    },

    mounted() {
      this.listParoquianos()
    },

    methods: {
      listParoquianos() {
        Paroquianos.listSelect().then(res => {
          this.listDizimistas = res.data
        })
      },

      addEntry() {
        // todo validate form
        this.$refs.observer.validate().then(success => {

          if (!success) {
            return
          }

          let entries = []
          let totalValue = this.model.entryValue
          let divisor = this.model.monthsSelected.length
          let value = parseInt((totalValue / divisor).toFixed(2))
          let checkValue = value*divisor
          let valueAdd = 0, valueSub = 0



          if (checkValue < totalValue) {
            valueAdd = totalValue - checkValue
          } else if(checkValue > totalValue) {
            valueSub = checkValue - totalValue
          }

          console.log('tetas--->', valueAdd, valueSub)
          
          this.model.monthsSelected.map((month, index) => {
            entries.push(
              {
                year: DateTime.now().toFormat('yyyy'),
                dizimista_id: this.dizimistaSelected,
                month: month,
                value: value
              }
            )
          })

          let lastIndex = entries.length - 1

          entries[lastIndex].value = entries[lastIndex].value - valueSub + valueAdd

          this.model.entries.push(...entries)
          this.model.monthsSelected = []
          this.model.entryValue = 0
          this.$nextTick(() => {
            this.$refs.observer.reset()
          })

        })
      },

      removeEntry(index) {
        this.model.entries.splice(index, 1)
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.col-entry-form {
  height: calc(100vh - 120px);  
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.13);
    background-color: #fcfcfc;
  }

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #fcfcfc;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #acacac;
  }

}
.form-entry {
  min-height: calc(100vh - 130px);
  padding: 12px;
  border: solid 1px #d6d6d6;
  border-radius: 12px;
}
</style>