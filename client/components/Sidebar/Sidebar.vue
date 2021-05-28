<template>
  <div  class="sidebar" :class="[{ 'available': availableMenu }, { 'opened': sidebarOpen }]">
    <div class="sidebar-logo d-flex justify-content-start align-items-center">
      <div class="container-logo">
        <div class="brand-logo mt-n3"><img class="img-fluid" src="/static/assets/images/brasao-arquidiocese.png" alt=""></div>
      </div>
    </div>
    <span @click="toggleSidebar()" id="btn-toggle" class="d-flex align-items-center" :class="{ 'available': availableMenu }">
      <span 
        class="material-icons-outlined text-white ml-n1"
      >
        {{ !sidebarOpen? 'chevron_right' : 'chevron_left' }}
      </span>
    </span>
    <div 
      v-for="(item, index) in menuItems" 
      :key="index" 
      class="mt-2 d-flex flex-nowrap align-items-center"
    >
      <router-link :to="item.href" class="nav-brand d-flex justify-content-center align-items-center">
        
        <span v-b-tooltip.right.hover :title="!sidebarOpen? item.label: ''" class="material-icons-outlined md-30">
          {{ item.icon }}
        </span>
        
      </router-link>
      <transition name="fade" mode="out-in">
        <span class="ml-2" v-if="sidebarOpened">{{ item.label }}</span>
      </transition>
      
    </div>
    <div>{{ mouseposition }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sidebarOpened: false,
        mouseposition: null,
        availableMenu: false,
        menuItems: [
          {
            name: 'Home',
            label: 'Início',
            icon: 'home',
            href: '/',
            routerName: 'HOME'
          },
          {
            name: 'Dízimo',
            label: 'Dízimo',
            icon: 'real_estate_agent',
            href: '/dizimo',
            routerName: 'MAIN_DIZIMO'
          },
          {
            name: 'Catequese',
            label: 'Catequese - Crisma',
            icon: 'class',
            href: '/catequese',
            routerName: 'MAIN_CATEQUESE'
          },
          {
            name: 'matrimonio',
            label: 'Matrimonio',
            icon: 'attractions',
            href: '/matrimonio',
            routerName: 'MAIN_MATRIMONIO'
          },
          {
            name: 'batismo',
            label: 'Batismo',
            icon: 'child_care',
            href: '/batismo',
            routerName: 'MAIN_BATISMO'
          }
        ]
      }
    },

    watch: {
      sidebarOpen(val) {
        if (val) {
          setTimeout(() => {
            this.sidebarOpened = true
          }, 100);
        } else {
          this.sidebarOpened = false
        }
      }
    },

    computed: {
      sidebarOpen() {
        return this.$store.state.sidebarOpen
      }
    },

    mounted() {
      $(document).on('mousemove', (event) => {
        let x = event.pageX,
            y = event.pageY

        if (this.sidebarOpen) {
          if (x > 300 && x <= 330) {
            this.availableMenu = true
          } else {
            this.availableMenu = false
          }
        } else {
          if (x > 80 && x <= 100) {
            this.availableMenu = true
          } else {
            this.availableMenu = false
          }
        }

        this.mouseposition = `X: ${event.pageX}, Y: ${event.pageY}`
      })
    },

    methods: {
      toggleSidebar() {
        this.$store.commit('SIDEBAR_TOGGLE')
      }
    }
  }
</script>

<style lang="scss" scoped>
.nav-brand {
  width: 55px;
  height: 55px;
  border-radius: 15px;
  color: #555555;
  &.router-link-exact-active {
    background-color: #f87000;
    color: #fff;
  }
}

#btn-toggle {
  position: absolute;
  top: 150px;
  right: -20px;
  height: 30px;
  width: 20px;
  border-radius: 0px 18px 18px 0px;
  background-color: #f87000;
  visibility: hidden;

  &.available {
    visibility: visible;
  }
}
.container-logo {
  width: 59px;
}

.fade-enter-active  {
  transition: opacity .5s;
}
.fade-enter {
  opacity: 0;
}

</style>