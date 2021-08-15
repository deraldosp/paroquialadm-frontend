<template>
  <div>
    <BaseView>

      <template #header>
        <div class="px-3 w-100 h-100 d-flex align-items-center justify-content-between">
          <div>
            <h5>{{ $t('Cadastro de Dizimistas') }}  <span v-if="id" class="ml-3 p-2 badge badge-secondary">#{{ id }}</span></h5>
          </div>
          <div class="d-flex">
            <b-button class="mr-2" size="sm" @click="goBack()" variant="outline-secondary"><i class="fas fa-chevron-left mr-2"></i>{{ $t('BACK')}}</b-button>
            <b-button size="sm" @click="saveDizimista()" variant="primary"><i class="far fa-save mr-2"></i>{{ $t('SAVE')}}</b-button>
          </div>
        </div>
      </template>

      <div class="row m-0 mb-5">
        <div class="col-lg-3 col-sm-12 menu-dizimista">
          <b-list-group>
            <b-list-group-item 
              class="border-0 nav-menu text-right" 
              v-for="(item, index) in itemsMenu" 
              :key="index"
              @click="setEditStep(item.id)"
              :class="{'active': item.id == activeNavItem}"
            > 
              
              <div class="pr-3" >
                {{ item.label }}
              </div>
            
            </b-list-group-item>
          </b-list-group>
        </div>
        
        
        
        <!-- formularios -->
        <div class="col-lg-9 col-sm-12">
          <div class="pl-2">
            <ValidationObserver ref="observer">
              <div class="container" v-show="activeNavItem == 1">

                <div class="row mt-3">
                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('TYPE') }}</label>
                    <ValidationProvider :name="$t('TYPE')" rules="required" v-slot="{ errors }">
                      <v-select :options="types" v-model="form.type" :reduce="item => item.value"></v-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>

                  <div class="col-lg-3 col-sm-6">
                    <label for="">{{ $t('PRINT_LABEL') }}</label>
                    <b-form-checkbox v-model="form.print_label" switch size="lg"></b-form-checkbox>
                  </div>

                  <div class="col-lg-3 col-sm-6">
                    <label for="">{{ $t('SORTITION_PARTICIPANT') }}</label>
                    <b-form-checkbox v-model="form.sortition_participant" switch size="lg"></b-form-checkbox>
                  </div>

                </div>
                
                <div class="row mt-3">
                  <div class="col-lg-8 col-sm-12">
                    <label for="">{{ $t('NAME') }}</label>
                    <ValidationProvider :name="$t('NAME')" rules="required" v-slot="{ errors }">
                      <b-form-input v-model="form.name"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('BIRTH_DAY') }}</label>
                    <ValidationProvider :name="$t('BIRTH_DAY')" rules="required" v-slot="{ errors }">
                    <div>
                      <date-pick
                          class="w-100"
                          v-model="form.birth"
                          :displayFormat="dateDisplayFormat"
                      ></date-pick>
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                </div>


                 <div class="row mt-3">
                  
                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('GENDER') }}</label>
                    <v-select :options="genders" v-model="form.gender" :reduce="item => item.value"></v-select>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('MARITAL_STATUS') }}</label>
                    <ValidationProvider :name="$t('MARITAL_STATUS')" vid="marital_status">
                      <v-select :options="weddingStatus" v-model="form.marital_status_id" :reduce="item => item.value"></v-select>
                    </ValidationProvider>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('WEDDING_DATE') }}</label>
                    <ValidationProvider :name="$t('WEDDING_DATE')" rules="required_if:marital_status,2" v-slot="{ errors }">
                    <div>
                      <date-pick
                          class="w-100"
                          v-model="form.wedding_date"
                          :displayFormat="dateDisplayFormat"
                      ></date-pick>
                    </div>
                    <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('ZIP') }}</label>
                    <ValidationProvider :name="$t('ZIP')" rules="required" v-slot="{ errors }">
                      <b-form-input @blur="getPostalCode(form.zip)" v-model="form.zip"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="row mt-3">
                                    
                  <div class="col-lg-7 col-sm-12">
                    <label for="">{{ $t('ADDRESS_1') }}</label>
                    <ValidationProvider :name="$t('ADDRESS_1')" rules="required" v-slot="{ errors }">
                      <b-form-input v-model="form.address_1"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>

                  <div class="col-lg-2 col-sm-12">
                    <label for="">{{ $t('ADDRESS_NUMBER') }}</label>
                    <ValidationProvider :name="$t('ADDRESS_NUMBER')" rules="required" v-slot="{ errors }">
                      <b-form-input ref="number" v-model="form.address_number"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>

                  <div class="col-lg-3 col-sm-12">
                    <label for="">{{ $t('ADDRESS_2') }}</label>
                    <b-form-input v-model="form.address_2"></b-form-input>        
                  </div>

                </div>

                
                <div class="row mt-3">
                   <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('DISTRICT') }}</label>
                    <b-form-input v-model="form.district"></b-form-input>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('STATE') }}</label>
                    <v-select 
                      :options="states" 
                      v-model="form.state" 
                      label="name" 
                      :reduce="item => item.abbreviation"
                      @input="getCities"
                      :clearable="false"
                      ></v-select>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('CITY') }}</label>
                    <v-select 
                      :options="cities" 
                      v-model="form.city" 
                      label="name" 
                      :reduce="item => item.name"
                      :clearable="false"
                      ></v-select>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-lg-3 col-sm-12">
                    <label for="">{{ $t('PHONE') }}</label>
                    <b-form-input v-model="form.phone"></b-form-input>
                  </div>

                  <div class="col-lg-3 col-sm-12">
                    <label for="">{{ $t('CELPHONE') }}</label>
                    <b-form-input v-model="form.celphone"></b-form-input>
                  </div>

                  <div class="col-lg-6 col-sm-12">
                    <label for="">{{ $t('EMAIL') }}</label>
                    <b-form-input v-model="form.email"></b-form-input>
                  </div>
                </div>


              </div>
            </ValidationObserver>
          </div>



        </div>
      </div>
    </BaseView>

  </div>
</template>

<script>
  import { Geo } from 'services/general.service'
  import { Paroquianos } from 'services/dizimo.service'
  import Axios from 'axios'

  export default {
    props: {
      id: {
        type: Number,
        require: false
      }
    },

    data() {
      return {
        itemsMenu: [
          {
            id: 1,
            label: this.$t('Informações pessoais'),
          },
          {
            id: 2,
            label: this.$t('Dizimos'),
          },
          {
            id: 3,
            label: this.$t('Formas de pagamento'),
          },
          {
            id: 4,
            label: this.$t('Dados Pastorais'),
          }
        ],
        
        activeNavItem: 1,
        loading: {
          states: false,
          cities: false,
          saving: false
        },

        form: {
          type: 1,
          name: null,
          birth: null,
          gender: null,
          marital_status_id: null,
          wedding_date: null,
          address_1: null,
          address_2: null,
          address_number: null,
          district: null,
          city: null,
          state: null,
          zip: null,
          phone: null,
          celphone: null,
          email: null,
          print_label: this.$route.name == 'DIZIMISTAS_NEW'? true : false,
          sortition_participant: true,
          status: null
        },

        states: [],
        cities: []
      }
    },

    computed: {
      dateDisplayFormat() {
        return this.$i18n.locale !== 'pt_br'? "YYYY/MM/DD" : "DD/MM/YYYY"
      },

      types() {
        return [
          { 
            label: this.$t("ADULT"),
            value: 1
          },
          {
            label: this.$t("CHILD"),
            value: 2
          }
        ]
      },

      genders() {
        return [
          {
            label: this.$t('MALE'),
            value: "M"
          },
          {
            label: this.$t('FEMALE')
          }
        ]
      },

      weddingStatus() {
        return [
          { 
            label: this.$t("SINGLE"),
            value: 1
          },
          {
            label: this.$t("MARRIED"),
            value: 2
          },
          {
            label: this.$t("WIDOWER"),
            value: 3
          },
          {
            label: this.$t("DIVORCED"),
            value: 4
          }
        ]
      }
    },

    mounted () {
      if (!this.id) {
        this.getStates()
      }

      if (this.id) {
        this.getDizimista(this.id)
      }
    },

    methods: {
      setEditStep(item_id) {
        this.activeNavItem = item_id
      },

      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      
      getDizimista(id) {
        Paroquianos.get(id).then(async res => {
          this.form = res.data
          await this.getStates()
          setTimeout(() => {
            this.getCities(res.data.state)
            
          }, 500)
        })
      },

      getStates() {
        this.loading.states = true
        Geo.getStates().then(res => {
          if (res.status = 200) {
            this.states = res.data
            this.loading.states = false
          }
        })
      },

      getCities(abbr) {
        if (abbr) {
          let state_id = this.states.find(item => item.abbreviation == abbr).id

          Geo.getCities(state_id).then(res => {
            if (res.status == 200) {
              this.cities = res.data
            }
          })
        } else { 
          this.cities = []
          this.form.city = null
        }
      },

      saveDizimista() {
        this.$refs.observer.validate().then(success => {
          if (!success) {
            return false
          }

          if (this.id) {
            Paroquianos.update(this.id, this.form).then(res => {
              if (res.status == 200) {
                this.$notify({
                  msg: "Salvo com sucesso!",
                  type: 'success'
                })
              }
            })
          } else {
            Paroquianos.create(this.form).then(res => {
              if (res.status == 201) {
                this.$notify({
                  msg: "Salvo com sucesso!",
                  type: 'success'
                })

                this.$router.push({ name: 'DIZIMISTAS_EDIT', params: { id: res.data.id }})
              }
            })
          }
        })
      },

      getPostalCode(cep) {

        if (!cep) {
          return
        }

        let headers = { 
          "Accept": "application/json"
        }

        Axios.get(`https://viacep.com.br/ws/${cep}/json/`, { headers }).then(res => {
          if (res.status == 200 && !res.data.erro) {
            const { data: address } = res
  
            this.form.address_1 = address.logradouro
            this.form.address_2 = address.complemento
            this.form.city = address.localidade
            this.form.district = address.bairro
            this.form.state = address.uf

            this.$refs.number.$el.focus()
          } 

//           bairro: "Vila Catupia"
// cep: "02933-080"
// complemento: ""
// ddd: "11"
// gia: "1004"
// ibge: "3550308"
// localidade: "São Paulo"
// logradouro: "Rua Tapendi"
// siafi: "7107"
// uf: "SP"
          console.log(res.data)
        })
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.menu-dizimista {
  // cborder-right: solid 1px #cc;
}

// .nav-group {
//   border-right: solid 1px #ccc;
// }

.list-group-item {
  border-right: solid 2px #dadada !important;

  &:hover {
    cursor: pointer;
  }

  &.active {
    font-weight: 800;
    background-color: #fff;
    color: rgb(58, 91, 197);
    border-right: solid 2px rgb(58, 91, 197) !important;
    border-radius: 0;
  }
 
}
</style>