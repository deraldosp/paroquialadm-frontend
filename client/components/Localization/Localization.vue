<template>
  <div>
    <div class="w-100 d-flex justify-content-center">
      <div @click="setLanguage(lang.lang)" v-for="lang in languages" :key="lang.lang" class="mx-1">
        <b-img  v-bind="imgProps" :src="lang.brand"></b-img>
      </div>
    </div>
  </div>
</template>

<script>
import { localize } from 'vee-validate'
  export default {
    data() {
      return {
        currentLanguage: 'pt_BR',
        imgProps: { width: 24, height: 24, class: 'm1'}
      }
    },

    computed: {
      languages() {
        return this.$store.state.languages
      }
    },

    methods: {
      setLanguage(lang) {
        console.log('tetas')
        this.$i18n.locale = lang
        localize(lang)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>