import { Geo } from 'services/general.service'
import { Paroquianos } from 'services/dizimo.service'

const DizimistaMixin = {
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
  },

  methods: {
    setEditStep(item_id) {
      this.activeNavItem = item_id
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

        console.log(res.data)
      })
    }
  }
}

export default DizimistaMixin