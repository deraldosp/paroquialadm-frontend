<template>
  <div class="sidebar-right py-3" :class="{'active': active}">
    <b-button-close class="mr-3" @click="close()"></b-button-close>
    <div class="container">
      <h5 v-if="!hasSlotTitle" v-html="title"></h5>
      <slot name="title"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    },

    data() {
      return {
        active: false
      }
    },

    computed: {
      hasSlotTitle() {
        return !!this.$slots.title
      }
    },

    mounted() {
      let self = this
      document.addEventListener('keydown', (e) => {
        if((e.key=='Escape'||e.key=='Esc')){
          self.close()
          console.log(e)
          e.preventDefault();
          return false;
        }
      })
    },

    methods: {
      show() {
        this.active = true
      },

      close() {
        this.active = false
        this.$emit('closed')
      }
    }
  }
</script>

<style lang="scss" scoped>
.sidebar-right{
	width: 370px;
  margin-right: -370px;
  position: fixed !important;
  height: 100vh;
	top: 0px;
	right: -370px;
	transition: all 0.3s cubic-bezier(0.26, 0.26, 0.26, 0.26);
	z-index: 999;
  overflow: auto;
  background-color: rgb(255, 255, 255);
  -webkit-box-shadow: -3px 2px 12px 0px rgba(0,0,0,0.27); 
  box-shadow: -3px 2px 12px 0px rgba(0,0,0,0.27);

  &.active{
    right: 0px;
    margin-right: 0px !important;
    transition: all 0.3s cubic-bezier(0.26, 0.26, 0.26, 0.26);
  }
}
</style>