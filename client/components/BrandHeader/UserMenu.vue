<template>
  <div class="pa-user-menu " :class="{'show': userMenuShow}">
    <span class="close" @click="$parent.toggleUserMenu()"></span>
    <div class="user-menu-header pb-2 d-flex justify-content-left align-items-center">
      <div class="ml-3">
        <div>
          <b-avatar variant="info" size="2.2em">DN</b-avatar></div>
        </div>
        <div class="ml-3" style="line-height: 0.9em">
          <div class="p-0">Deraldo Nascimento</div>
          <div><small class="p-0 text-muted">deraldosp@gmail.com</small></div>
        </div>
    </div>

    <div class="user-menu-body ml-2">
      <div class="align-self-top ml-2">
        <div class="small">Gerenciar Perfil</div>
        <div class="small">Solicitar ajuda</div>
        <div class="small">Sair do sistema</div>
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
    },

    mounted() {
      this.$root.$on('closeUserMenu', () => {
        this.$store.commit('CLOSE_USER_MENU')
      })

      $('.pa-user-menu').click(event => {
        event.stopPropagation();
      })
    }
  }
</script>

<style lang="scss" scoped>

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