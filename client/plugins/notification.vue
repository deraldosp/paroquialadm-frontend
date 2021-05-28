<template>
  <div v-html="msg">

  </div>
</template>

<script>
  export default {
    name: 'notifyTost',
    props: {
      msg: {
        type: String,
        default: 'no message'
      }
    }
  }
</script>