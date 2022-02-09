<template>
  <div id="app">
    <BrandHeader v-if="$route.name != 'LOGIN'"></BrandHeader>
    <div v-if="$route.name != 'LOGIN'">
      <Sidebar></Sidebar> 
    </div>  
    <left-menu></left-menu>
    <div class="main-container sidebar-visible" :class="{ 'menu-expanded': sidebarOpen   }" style="overflow: hidden">
      <div :class="{'login-view': $route.name == 'LOGIN'}">
        <router-view></router-view>
      </div>
    </div>
    <!-- <b-button class="btn-teste" @click="toggleMenu()">aperte</b-button> -->
  </div>
</template>

<script>
import LeftMenu from 'components/LeftMenu'
import Sidebar from 'components/Sidebar'
import BrandHeader from 'components/BrandHeader'
import { mapState } from 'vuex'
import parseJwt from 'helpers/ParseJwt'

export default {
  components: {
    LeftMenu,
    Sidebar,
    BrandHeader
  },
  
  data() {
    return {
      leftMenu: false,
      tokenTimer: 0,
      dateNow: null
    }
  },

  computed: {
    ...mapState(['logged']),
    sidebarOpen() {
      return this.$store.state.sidebarOpen
    },
    userMenu() {
      return this.$store.state.userMenu
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
    },

    checkToken() {
      if (localStorage.getItem('jwt') && this.$store.state.logged) {
        let expires = parseJwt(localStorage.getItem('jwt')).exp
        let now = this.$DateTime.now().toFormat('X')
  
        let diff = expires - now
        
        // se diferença o timestamp do token e timestamp atual form menor que dois minutos
        if (diff < 120) {
          // diferença do timestamp negativa indica token já expirado, necessário login manual
          if (diff < 0) {
            this.$store.dispatch('logout').then(()=>{
              $router.push({ name: 'LOGIN'})
            })
          }
          // renova o token
          this.$store.dispatch('refreshToken', localStorage.getItem('jwt'))
        } 
      }      
    }
  },

  mounted() {
    this.defineDeviceDisplay()

    // verifica o token a cada 1 minuto
    this.tokenTimer = setInterval(() => {
      this.checkToken()
    }, 60000)

    window.addEventListener('click', () => {
      if (this.userMenu) {
        this.$root.$emit('closeUserMenu')
      }
    })


  },
  
  updated() {
    this.defineDeviceDisplay()
  },

  destroyed() {
    window.removeEventListener('resize', this.defineDeviceDisplay)
    window.removeEventListener('closeUserMenu')
  }

  
}
</script>

<style lang="scss">
@import 'static/assets/scss/bootstrap/_variables.scss';
@import 'static/assets/scss/vue-select/_variables.scss';
@import 'vue-select/src/scss/vue-select.scss';
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
