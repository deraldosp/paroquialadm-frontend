<template>
  <div id="app">
    <div class="brandheader">
      
    </div>
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
export default {
  components: {
    LeftMenu,
    Sidebar
  },
  
  data() {
    return {
      leftMenu: true
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
    }
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
  top: 0;
  right: 20px;
}
</style>
