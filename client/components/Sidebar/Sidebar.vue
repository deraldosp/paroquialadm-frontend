<template>
  <div class="sidebar" :class="[{ 'available': availableMenu }, { 'opened': sidebarOpen }]">
    <div class="sidebar-logo d-flex justify-content-start align-items-center">
      <div class="container-logo" @click="goToHome()">
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
    <ul 
      class="list-group mt-2"
    >
      <li v-for="(item, index) in menuItems" :key="index" class="list-group-item p-0 mx-0 my-2 border-0">
        
        <div class="d-flex flex-nowrap align-items-center">
          <router-link :to="item.href" class="nav-brand d-flex justify-content-center align-items-center">
            
            <span v-b-tooltip.right.hover :title="!sidebarOpen? item.label: ''" class="material-icons-outlined md-30">
              {{ item.icon }}
            </span>
            
          </router-link>
          <transition name="fade" mode="out-in">
            <router-link v-if="sidebarOpened" :to="item.href" class="nav-text">
              <span class="ml-2" >{{ item.label }}</span>
            </router-link>
            
          </transition>
        <span v-if="sidebarOpened" class="float-right" @click="toggleChildrenMenu(index)">abrir</span>
        </div>
        

        <div>
          <transition name="fade" mode="out-in">
            <b-collapse id="collapse-4" v-if="sidebarOpened" v-model="item.childrenVisible">
              <ul class="list-group ml-5">
                <li class="list-group-item border-0" :key="subItem.href" v-for="subItem in item.children">
                  <router-link  class="nav-text sub-item" :to="subItem.href">{{ subItem.label }}</router-link>
                </li>
              </ul>
            </b-collapse>
          </transition>      
        </div>
      </li>

      
    </ul>
    
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
          // {
          //   name: 'Home',
          //   label: 'Início',
          //   icon: 'home',
          //   href: '/',
          //   routerName: 'HOME',
          //   childrenVisible: false
          // },
          {
            name: 'Dízimo',
            label: 'Dízimo',
            icon: 'real_estate_agent',
            href: '/dizimo',
            routerName: 'MAIN_DIZIMO',
            childrenVisible: false,
            children: [
              {
                name: 'Dizimistas',
                label: 'Dizimistas',
                icon: '',
                href: '/dizimo/dizimistas',
                routerName: 'DIZIMISTAS'
              }
            ]
          },
          {
            name: 'Catequese',
            label: 'Catequese - Crisma',
            icon: 'class',
            href: '/catequese',
            routerName: 'MAIN_CATEQUESE',
            childrenVisible: false
          },
          {
            name: 'matrimonio',
            label: 'Matrimonio',
            icon: 'attractions',
            href: '/matrimonio',
            routerName: 'MAIN_MATRIMONIO',
            childrenVisible: false
          },
          {
            name: 'batismo',
            label: 'Batismo',
            icon: 'child_care',
            href: '/batismo',
            routerName: 'MAIN_BATISMO',
            childrenVisible: false
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
          if (x > 0 && x <= 330) {
            this.availableMenu = true
          } else {
            this.availableMenu = false
          }
        } else {
          if (x > 0 && x <= 100) {
            this.availableMenu = true
          } else {
            this.availableMenu = false
          }
        }

        this.mouseposition = `X: ${event.pageX}, Y: ${event.pageY}`
      })

    },

    methods: {
      goToHome() {
        this.$router.push('/')
      },

      toggleSidebar() {
        this.$store.commit('SIDEBAR_TOGGLE')
      },
      toggleChildrenMenu(index) {
        this.menuItems[index].childrenVisible = !this.menuItems[index].childrenVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
.nav-brand {
  text-decoration: none !important;
  width: 55px;
  height: 55px;
  border-radius: 15px;
  color: #555555;
  &.router-link-exact-active {
    background-color: #f87000;
    color: #fff;
  }

  &.router-link-active {
    background-color: #f87000;
    color: #fff;
  }
}

.nav-text {
  text-decoration: none;
  color: #555555;
  &.router-link-exact-active {
    color: #f87000;
    font-weight: 600;
  }
  &.router-link-active {
    color: #f87000;
  }

  &.sub-item {
    font-size: 0.85em;
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

  &:hover {
    cursor: pointer;
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