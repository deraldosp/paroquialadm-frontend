<template>
  <div class="pa-user-menu pa-animate-right shadow" :class="{'show': userMenuShow}">
    <span class="close" @click="$parent.toggleUserMenu()"></span>
    <div class="user-menu-header pb-2 d-flex justify-content-left align-items-end">
      <div><b-avatar variant="light" size="2.5em"></b-avatar></div>
      <div class="ml-2">Deraldo Nascimento</div>
    </div>

    <div class="user-menu-body p-2">
      <div class="align-self-top float-right">
        <i class="material-icons material-icons-outline" style="font-size: 2em">logout</i>
      </div>
    </div>
      
    
  </div>
</template>

<script>
  export default {
    computed: {
      userMenuShow() {
        return this.$store.state.userMenu
      }
    }
  }
</script>

<style lang="scss" scoped>


.pa-user-menu {

  .user-menu-header {
    background-color: rgb(255, 102, 0);
    padding-left: 15px;
    color: #fff;
    font-size: 20px;
    height: 80px;
    
    
  }

}

.pa-animate-right{
  // position:relative;
  animation:animateright 0.4s
}
@keyframes animateright{
  from{
      right:-300px;
      opacity:0
  }
   to{
      right:0;
      opacity:1
  }
}

</style>