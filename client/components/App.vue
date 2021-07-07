<template>
  <div id="app">
    <BrandHeader v-if="$route.name != 'LOGIN'"></BrandHeader>
    <div v-if="$route.name != 'LOGIN'">
      <Sidebar></Sidebar> 
    </div>  
    <left-menu></left-menu>
    <div class="main-container sidebar-visible" :class="{ 'menu-expanded': sidebarOpen   }">
      <div :class="{'login-view': $route.name == 'LOGIN'}">
        <router-view></router-view>
      </div>
    </div>
    <b-button class="btn-teste" @click="toggleMenu()">aperte</b-button>
  </div>
</template>

<script>
import LeftMenu from 'components/LeftMenu'
import Sidebar from 'components/Sidebar'
import BrandHeader from 'components/BrandHeader'
import { mapState } from 'vuex'
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
    ...mapState(['logged']),
    sidebarOpen() {
      return this.$store.state.sidebarOpen
    },
    
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
  font-size: 0.95rem;
  font-family: 'Nunito', sans-serif;
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

.login-view {
  position: fixed;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
}
</style>
