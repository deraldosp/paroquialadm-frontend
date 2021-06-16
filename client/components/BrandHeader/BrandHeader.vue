<template>
  <div>
    <div class="brandheader" :class="{ 'menu-expanded': $parent.sidebarOpen }">
      <div class="h-100 d-flex align-items-center">
        
        <div class="d-flex flex-fill justify-content-center px-4">
          <b-input placeholder="Busca" style="border-radius: 20px"></b-input>
        </div>


        <div class="d-flex justify-content-end">  
          <div class="h-100 d-flex align-items-center ml-2 pointer" @click="toggleUserMenu()">
            <b-avatar variant="info" id="user-menu" class="mr-2">DN</b-avatar>
            <!-- <div>Deraldo Nascimento</div> -->
          </div>
          <div>
            <UserMenu></UserMenu>
          </div>
          

          <template v-if="$store.state.currentDeviceDisplay !== 'smartphone'">

            <div id="popo" class="btn btn-light rounded-circle ml-2">
              <span class="material-icons-round">notifications_none</span>
            </div>

            <b-popover custom-class="shadow border-0" target="popo" triggers="hover" placement="top">
              <template #title>Popover Title</template>
              I am popover <b>component</b> content!
            </b-popover>

            <div class="btn btn-light rounded-circle ml-2">
              <span class="material-icons">logout</span>
            </div>


          </template>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import UserMenu from './UserMenu'
  export default {
    components: {
      UserMenu
    },

    methods: {
      toggleUserMenu() {
        console.log('tetas')
        this.$store.commit('TOGGLE_USER_MENU')
      }
    }
    

  }
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>