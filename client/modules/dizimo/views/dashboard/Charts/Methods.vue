<template>
  <div>
    <apexchart height="170" type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
  export default {
    components: {
      "apexchart": VueApexCharts
    },

    data() {
      return {
        series: [60, 30, 6, 4],
        chartOptions: {
          labels: ["Dinheiro", "Depósito", "Cartão", "Cheque"],
          colors: ["#E0A228","#34E089", "#E06B1D", "#0762E0", "#E02812"],
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
                height: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>