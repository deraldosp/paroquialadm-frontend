<template>
  <div>
    <div class="pl-2">
      <ValidationObserver ref="observer">
        <div class="container">

          <div class="row mt-3">
            <div class="col-12">
              <label for="">{{ $t('TYPE') }}</label>
              <ValidationProvider :name="$t('TYPE')" rules="required" v-slot="{ errors }">
                <v-select :options="types" v-model="form.type" :reduce="item => item.value"></v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>

            <div class="col-6">
              <label for="">{{ $t('PRINT_LABEL') }}</label>
              <b-form-checkbox v-model="form.print_label" switch size="lg"></b-form-checkbox>
            </div>

            <div class="col-6">
              <label for="">{{ $t('SORTITION_PARTICIPANT') }}</label>
              <b-form-checkbox v-model="form.sortition_participant" switch size="lg"></b-form-checkbox>
            </div>

          </div>
          
          <div class="row mt-3">
            <div class="col-12">
              <label for="">{{ $t('NAME') }}</label>
              <ValidationProvider :name="$t('NAME')" rules="required" v-slot="{ errors }">
                <b-form-input v-model="form.name"></b-form-input>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>

            <div class="col-12">
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
            
            <div class="col-12">
              <label for="">{{ $t('GENDER') }}</label>
              <v-select :options="genders" v-model="form.gender" :reduce="item => item.value"></v-select>
            </div>

            <div class="col-12">
              <label for="">{{ $t('MARITAL_STATUS') }}</label>
              <ValidationProvider :name="$t('MARITAL_STATUS')" vid="marital_status">
                <v-select :options="weddingStatus" v-model="form.marital_status_id" :reduce="item => item.value"></v-select>
              </ValidationProvider>
            </div>

            <div class="col-12">
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
            <div class="col-12">
              <label for="">{{ $t('ZIP') }}</label>
              <ValidationProvider :name="$t('ZIP')" rules="required" v-slot="{ errors }">
                <b-form-input @blur="getPostalCode(form.zip)" v-model="form.zip"></b-form-input>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </div>

          <div class="row mt-3">
                              
            <div class="col-12">
              <label for="">{{ $t('ADDRESS_1') }}</label>
              <ValidationProvider :name="$t('ADDRESS_1')" rules="required" v-slot="{ errors }">
                <b-form-input v-model="form.address_1"></b-form-input>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>

            <div class="col-12">
              <label for="">{{ $t('ADDRESS_NUMBER') }}</label>
              <ValidationProvider :name="$t('ADDRESS_NUMBER')" rules="required" v-slot="{ errors }">
                <b-form-input ref="number" v-model="form.address_number"></b-form-input>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>

            <div class="col-12">
              <label for="">{{ $t('ADDRESS_2') }}</label>
              <b-form-input v-model="form.address_2"></b-form-input>        
            </div>

          </div>

          
          <div class="row mt-3">
              <div class="col-12">
              <label for="">{{ $t('DISTRICT') }}</label>
              <b-form-input v-model="form.district"></b-form-input>
            </div>

            <div class="col-12">
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

            <div class="col-12">
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
            <div class="col-12">
              <label for="">{{ $t('PHONE') }}</label>
              <b-form-input v-model="form.phone"></b-form-input>
            </div>

            <div class="col-12">
              <label for="">{{ $t('CELPHONE') }}</label>
              <b-form-input v-model="form.celphone"></b-form-input>
            </div>

            <div class="col-12">
              <label for="">{{ $t('EMAIL') }}</label>
              <b-form-input v-model="form.email"></b-form-input>
            </div>
          </div>

          <div class="mt-4">
            <div class=" mb-3 float-right">
              <b-button variant="primary">{{ $t('SAVE') }}</b-button>
            </div>
          </div>

        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
  import DizimistaMixin from '../mixins/Dizimistas'

  export default {
    mixins: [DizimistaMixin],
    
    props: {
      form: {
        type: Object
      }
    },

    computed: {
      dateDisplayFormat() {
        return this.$i18n.locale !== 'pt_br'? "YYYY/MM/DD" : "DD/MM/YYYY"
      },
    }
  
  }
</script>

<style lang="scss" scoped>

</style>