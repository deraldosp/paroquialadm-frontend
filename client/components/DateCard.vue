<template>
  <div class="card mb-3" style="max-width: 400px;">
    <div class="row no-gutters">
      <div class="col-md-4" :class="bgVariant">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <DatePick v-model="dateTime" :editable="editable">
            <template v-slot:default="{ toggle }">
              <div class="card-date" @click="editable? toggle() : () => false">
                <div class="card-date-day">{{ day }}</div>
                <div class="card-date-content">{{ month }} {{ year }}</div>
              </div>
            </template>

          </DatePick>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          
          <template v-if="hasTitleSlot">
            <slot name="title">
            </slot>
          </template>
          <template v-else>
              <h5 class="card-title" style="font-weight: 600" v-html="title"></h5>
          </template>
          
          <template v-if="hasDefaultSlot">
            <slot name="default">
            </slot>
          </template>
          <template v-else>
              <p class="card-text" v-html="content"></p>
          </template>
          
          
          <div class="card-text text-right mt-auto align-self-end"><b-button @click="handleDate()" variant="primary" size="sm">Iniciar</b-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { DateTime } from 'luxon'
  
  export default {
    props: {
      editable: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
      },
      content: {
        type: String
      },
      time: {
        type: String,
        validator: function (value) {
          let pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
          return pattern.test(value)
        }
      },
      variant: {
        type: String,
        default: 'primary',
        validator: function (value) {
          // O valor precisa corresponder a alguma dessas Strings
          return ['success', 'warning', 'danger', 'primary', 'secondary'].indexOf(value) !== -1
        }
      }
    },

    data() {
      return {
        date: this.$DateTime.now(),
        dateTime: null,
        changedTime: null
      }
    },

    computed: {
      day() {
        return this.date.toFormat('dd')
      },
      month() {
        return this.date.toFormat('LLL')
      },
      year() {
        return this.date.toFormat('yyyy')
      },

      hasTitleSlot() {
        return !!this.$slots.title
      },

      hasDefaultSlot() {
        return !!this.$slots.default
      },

      bgVariant() {
        return `bg-${this.variant}`
      }

    },
    
    methods: {
      handleDate() {
        let time = this.time? ` ${this.time}` : DateTime.now().toFormat('HH:mm')
        let payload = {
          date: this.date.toFormat(`yyyy-MM-dd`),
          time: time
        }
        this.$emit('dateChanged', payload)
      }
    },

    watch: {
      dateTime(val) {
        if (val) {
          this.date = DateTime.fromString(val, `yyyy-MM-dd`)
        } else {
          this.date = DateTime.now()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.card-date {
  cursor: pointer;
  text-align: center;
  color: #fff;
  .card-date-day {
    font-size: 50px;
    font-weight: 900;
  }
  .card-date-content {
    font-size: 18px;
  }
}
.card-body {
  min-height: 150px;
}

</style>