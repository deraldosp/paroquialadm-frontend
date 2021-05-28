<template>
  <div>
    <div class="">

      <div class="row align-items-start">
        <div class="col-sm-12 col-md-4 col-lg-4 ">
          <div class="pa-card">funcionou</div>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-4">
          <div class="pa-card">funcionou</div>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-4">
          <div class="pa-card">funcionou</div>
        </div>
      </div>

      <div class="row mt-4 h-75">
        <div class="col-8 h-100">
          <div class="pa-card">
            <b-list-group>
              <b-list-group-item v-for="n in 11" :key="n">Lista item {{ n }}</b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div class="col-4">
          <div class="pa-card">
            <b-list-group>
              <b-list-group-item v-for="n in 11" :key="n">Lista item {{ n }}</b-list-group-item>
            </b-list-group>
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