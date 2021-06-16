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
            selection: { enabled: false},
            height: 200,
            type: 'radialBar',
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#f87000'],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
              colorStops:
              [ 
                [
                  {
                    offset: 20,
                    color: '#FCB20D',
                    opacity: 1
                  },
                  {
                    offset: 100,
                    color: '#f87000',
                    opacity: 50
                  },
                  
                ]
              ]
            }
          
          },
          stroke: {
            lineCap: 'round'
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '60%',
              },
            },
          },
          labels: ['Meta'],
        }, 
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>