<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
  import '@fullcalendar/core/vdom' // solves problem with Vite
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'

  export default {
    components: {
      FullCalendar
    },

    data() {
      return {
        calendarOptions: {
          plugins: [ dayGridPlugin, interactionPlugin ],
          initialView: 'dayGridMonth'
        }
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>