<template>
  <div id="app">
    <BrandHeader></BrandHeader>
    <div>
      <Sidebar></Sidebar> 
    </div>  
    <left-menu></left-menu>
    <div class="main-container sidebar-visible" :class="{ 'menu-expanded': sidebarOpen   }">
      <router-view></router-view>
    </div>
    <b-button class="btn-teste" @click="toggleMenu()">aperte</b-button>
  </div>
</template>

<script>
import LeftMenu from 'components/LeftMenu'
import Sidebar from 'components/Sidebar'
import BrandHeader from 'components/BrandHeader'
export default {
  components: {
    LeftMenu,
    Sidebar,
    BrandHeader
  },
  
  data() {
    return {
      leftMenu: false
    }
  },

  computed: {
    sidebarOpen() {
      return this.$store.state.sidebarOpen
    }
  },

  methods: {
    toggleMenu() {
      this.leftMenu = !this.leftMenu
    },

    defineDeviceDisplay() {
      window.addEventListener('resize', () => {
        this.$store.commit('SET_DEVICE_DISPLAY')
      })
    }
  },

  mounted() {
    this.defineDeviceDisplay()
    window.addEventListener('click', () => {
      this.$root.$emit('closeUserMenu')
    })
  },
  
  updated() {
    this.defineDeviceDisplay()
    window.addEventListener('click', () => {
      this.$root.$emit('closeUserMenu')
    })
  },

  destroyed() {
    window.removeEventListener('resize', this.defineDeviceDisplay)
    window.removeEventListener('closeUserMenu')
  }

  
}
</script>

<style lang="scss">
@import 'static/assets/scss/bootstrap/_variables.scss';
@import 'bootstrap/scss/bootstrap.scss';
body {
  margin: 0;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
  background-color: #e0f2ff;
}
.page {
  text-align: center;
  /* nesting for the need to test postcss */
  code {
    background-color: #e0f2ff;
    padding: 3px 5px;
    border-radius: 2px;
  }
}

.btn-teste {
  position: fixed;
  bottom: 0;
  right: 20px;
}
</style>
