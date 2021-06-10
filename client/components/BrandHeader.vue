<template>
  <div>
    <div class="brandheader" :class="{ 'menu-expanded': $parent.sidebarOpen }">
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
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>