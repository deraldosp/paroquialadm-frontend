<template>
  <div class="counter-wrapper">
    <div class="counter">
      {{ count }}
    </div>
    <button class="btn btn-primary" @click="$store.commit('INCREMENT')">Increment</button>
    <button class="btn btn-primary" @click="$store.commit('DECREMENT')">Decrement</button>
    <button class="btn btn-secondary" @click="$store.dispatch('incrementAsync')">Increment Async</button>
    <button class="btn btn-success" @click="teste">Increment Async</button>
    <v-select class="mt-2 mx-3" :options="options" v-model="opcao" label="name"></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opcao: null
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    },

    options() {
      return [
        {
          id: 1,
          name: 'Deraldo'
        },
        {
          id: 2,
          name: 'Lucas'
        }
      ]
    }
  },
  methods: {
    
    teste() {
      this.$notify({
        msg: 'funcionou',
        type: 'success'
      })
    }
  }
}
</script>

