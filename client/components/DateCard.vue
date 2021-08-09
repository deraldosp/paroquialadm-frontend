<template>
  <div class="card mb-3 " style="max-width: 400px;">
    <div class="row no-gutters">
      <div class="col-md-5 bg-primary">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <div class="card-date">
            <div class="card-date-day">11</div>
            <div class="card-date-content">Ago 2021</div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title" style="font-weight: 600">Missa 07:30</h5>
          <p class="card-text">Registrar pagamamentos de dízimo</p>
          <p class="card-text text-right"><b-button variant="primary" size="sm">Iniciar</b-button></p>
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
.card-date {
  text-align: center;
  color: #fff;
  .card-date-day {
    font-size: 50px;
    font-weight: 900;
  }
  .card-date-content {
    font-size: 18px;
  }
}

</style>