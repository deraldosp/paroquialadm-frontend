<template>
  <div>
    <div class="brandheader" :class="{ 'menu-expanded': $parent.sidebarOpen }">
      <div class="h-100 d-flex align-items-center">
        
        <div class="d-flex flex-fill justify-content-center px-4">
          <b-input placeholder="Busca" style="border-radius: 20px"></b-input>
        </div>


        <div class="d-flex justify-content-end">  
          <div class="h-100 d-flex align-items-center ml-2">
            <b-avatar variant="info" id="user-menu" class="mr-2" v-b-popover.click></b-avatar>
            <!-- <div>Deraldo Nascimento</div> -->
          </div>

          <b-popover 
            target="user-menu" 
            custom-class="border-0 bg-transparent"
            placement="bottomleft"
          >
            <UserMenu></UserMenu>
          </b-popover>

          <template v-if="$store.state.currentDeviceDisplay !== 'smartphone'">

            <div class="btn btn-light rounded-circle ml-2">
              <span class="material-icons-round">notifications_none</span>
            </div>

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
    }
    
  }
</script>

<style lang="scss" scoped>

</style>