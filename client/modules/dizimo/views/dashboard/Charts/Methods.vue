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
          // colors: ["#FCB9AA","#ECEAE4", "#FFDBCC", "#A2E1DB", "#55CBCD"],
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