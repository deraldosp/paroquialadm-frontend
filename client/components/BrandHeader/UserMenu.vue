<template>
  <div class="user-menu">
    <div class="user-menu-header d-flex justify-content-left align-items-end">
      <div class="user-menu-avatar d-flex justify-content-center align-items-center">
        <b-avatar variant="info" class="mr-2" size="5em"></b-avatar>
      </div>
      <div class="ml-3 text-white">Deraldo Nascimento</div>
    </div>

    <div class="user-menu-body"></div>
      
    
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.user-menu {
  $orange:  #e26600;
  padding: 2px;
  width: 400px;
  height: 250px;
  background: rgb(255,217,141);
  background: linear-gradient(90deg, rgba(255,217,141,1) 0%, rgba(226,102,0,1) 100%);

  .user-menu-body {
    height: calc(100% - 80px);
    width: 100%;
    background: #fff;
  }
}

.user-menu-header {
  $orange:  #e26600;
  height: 80px;
  width: 100%;
  background: transparent;
  
  .user-menu-avatar {
    position: relative;
    left: 20px;
    width: 80px;
    height: 80px;
    background: transparent;
    top: 30px;
  }
  
}


</style>