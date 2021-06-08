<template>
  <div id="app">
    <div class="brandheader">
      <div class="h-100 d-flex justify-content-between align-items-center">
        
        <div class="w-50 d-flex justify-content-center">
          <b-input placeholder="Busca" style="border-radius: 20px"></b-input>
        </div>


        <div class="w-50 d-flex justify-content-end">  
          <div class="h-100 d-flex align-items-center mr-3">
            <b-avatar variant="info" class="mr-2"></b-avatar>
            <div>Deraldo Nascimento</div>
          </div>

          <div class="btn btn-light rounded-circle mr-3">
            <span class="material-icons-round">notifications_none</span>
          </div>

          <div class="btn btn-light rounded-circle mr-3">
            <span class="material-icons">star</span>
          </div>

          <div class="btn btn-light rounded-circle">
            <span class="material-icons">logout</span>
          </div>
        </div>
      </div>
      
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
  bottom: 0;
  right: 20px;
}
</style>
