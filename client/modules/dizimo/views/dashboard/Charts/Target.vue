<template>
  <div>
    <apexchart height="200" type="radialBar" :options="chartOptions" :series="series"></apexchart>
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
        series: [90],
        chartOptions: {
          chart: {
            height: 200,
            type: 'radialBar',
          },
          fill: {
            type: 'solid',
            colors: ['#f87000']
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '60%',
              },
            },
          },
          labels: ['Cricket'],
        }, 
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>