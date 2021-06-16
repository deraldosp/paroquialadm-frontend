<template>
  <div>
    <apexchart height="170" type="bar" :options="chartOptions" :series="series"></apexchart>
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
        series: [
          {
            name: 'Obtido',
            data: [
              {
                x: 'Jan',
                y: 12500,
                goals: [
                  {
                    name: 'Meta',
                    value: 15000,
                    strokeWidth: 2,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Fev',
                y: 14355,
                goals: [
                  {
                    name: 'Meta',
                    value: 18000,
                    strokeWidth: 2,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Mar',
                y: 17800,
                goals: [
                  {
                    name: 'Meta',
                    value: 18000,
                    strokeWidth: 2,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Abr',
                y: 17300,
                goals: [
                  {
                    name: 'Meta',
                    value: 18000,
                    strokeWidth: 2,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Mai',
                y: 19800,
                goals: [
                  {
                    name: 'Meta',
                    value: 18000,
                    strokeWidth: 2,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Jun',
                y: 25000,
                goals: [
                  {
                    name: 'Meta',
                    value: 20000,
                    strokeWidth: 2,
                    strokeColor: '#775DD0'
                  }
                ]
              }
            ]
          }
        ],

        chartOptions: {
          chart: {
            height: 170,
            type: 'bar',
            toolbar: { tools: { download: false } }
          },
          plotOptions: {
            bar: {
              columnWidth: '60%',
              horizontal: false
            }
          },
          colors: ['#00E396'],
          dataLabels: {
            enabled: false,
            // formatter: function(val, opt) {
            //     const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals
            
            //     if (goals && goals.length) {
            //       return `${val} / ${goals[0].value}`
            //     }
            //     return val
            // }
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Obtido', 'Meta'],
            markers: {
              fillColors: ['#00E396', '#775DD0']
            }
          }
        },
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>