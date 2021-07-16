<template>
  <div>
    <BaseView>

      <template #header>
        <div class="px-3 w-100 h-100 d-flex align-items-center justify-content-between">
          <div>
            <h5>{{ $t('Cadastro de Dizimistas') }}</h5>
          </div>
          <div>
            <b-button class="mr-2" size="sm" @click="backToList()" variant="outline-secondary"><i class="fas fa-chevron-left mr-2"></i>{{ $t('BACK')}}</b-button>
            <b-button size="sm" @click="saveDizimista()" variant="primary"><i class="far fa-save mr-2"></i>{{ $t('SAVE')}}</b-button>
          </div>
        </div>
      </template>

      <div class="row m-0">
        <div class="col-3 menu-dizimista">
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
        <div class="col-9">
          <div class="pl-2">
            <ValidationObserver ref="observer">
              <div v-show="activeNavItem == 1">
                
                <div class="row mt-3">
                  <div class="col-lg-8 col-sm-12">
                    <label for="">{{ $t('NAME') }}</label>
                    <b-form-input v-model="form.name"></b-form-input>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('BIRTH_DAY') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
                  </div>
                </div>


                 <div class="row mt-3">
                   <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('GENDER') }}</label>
                    <b-form-input v-model="form.name"></b-form-input>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('MARITAL_STATUS') }}</label>
                    <b-form-input v-model="form.name"></b-form-input>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('WEDDING_DATE') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-lg-8 col-sm-12">
                    <label for="">{{ $t('ADDRESS_1') }}</label>
                    <b-form-input v-model="form.name"></b-form-input>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('ADDRESS_NUMBER') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('ADDRESS_2') }}</label>
                    <b-form-input v-model="form.name"></b-form-input>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('DISTRICT') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
                  </div>

                  <div class="col-lg-4 col-sm-12">
                    <label for="">{{ $t('ZIP') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-lg-5 col-sm-12">
                    <label for="">{{ $t('STATE') }}</label>
                    <b-form-input v-model="form.name"></b-form-input>
                  </div>

                  <div class="col-lg-7 col-sm-12">
                    <label for="">{{ $t('CITY') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-lg-3 col-sm-12">
                    <label for="">{{ $t('PHONE') }}</label>
                    <b-form-input v-model="form.name"></b-form-input>
                  </div>

                  <div class="col-lg-3 col-sm-12">
                    <label for="">{{ $t('CELPHONE') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
                  </div>

                  <div class="col-lg-6 col-sm-12">
                    <label for="">{{ $t('EMAIL') }}</label>
                    <b-form-input v-model="form.birth"></b-form-input>
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
  export default {

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
        form: {
          name: null,
          birth: null,
          gender: null,
          marital_status: null,
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
          print_label: false,
          sortition_participant: true,
          status: null
        }
      }
    },

    methods: {
      setEditStep(item_id) {
        this.activeNavItem = item_id
      },

      saveDizimista() {
        console.log('tetas')
      },

      backToList() {
        this.$router.push({ name: 'DIZIMISTAS' })
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