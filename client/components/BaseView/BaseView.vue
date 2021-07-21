<template>
  <div class="base-view" :style="`background-color: ${bgColor}`">
    
    <div v-if="!headerHidden" class="base-view-header">
      <slot name="header"></slot>
    </div>

    <div class="base-view-body" :class="layout">
      
      <slot></slot>
     
    </div>

    <div v-if="footerShow" class="base-view-footer">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      footerShow: Boolean,
      headerHidden: {
        type: Boolean,
        default: false
      },
      titleContent: String,
      footerContent: String,
      bgColor: {
        type: String,
        default: '#fff'
      }
    },

    computed: {
      layout() {
        if (this.footerShow && !this.headerHidden) {
          return 'header-footer'
        }

        if (!this.footerShow && !this.headerHidden) {
          return 'only-header'
        }

        if (this.footerShow && this.headerHidden) {
          return 'only-footer'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
$bv_header_height: 70;
$bv_footer_height: 30;
$bv_padding: 25;

.base-view-header {
  width: 100%;
  height: #{$bv_header_height+'px'};
  display: flex;
  flex-direction: row;
  // background-color: cyan;
  padding: 0px;
  overflow-y: hidden auto;
  overflow-x: hidden;
  border-bottom: solid 0.15em rgb(202, 202, 202);
  
}

.base-view-body {
  height: calc(100vh - calc(80px + #{$bv_padding + 'px'}));
  width: 100%;
  padding: 10px 0px;
  overflow-y: auto !important;
  
  &.header-footer {
    height: calc(100vh - calc(80px + #{($bv_header_height + $bv_footer_height + $bv_padding)+'px'}));
  }
  &.only-header {
    height: calc(100vh - calc(80px + #{($bv_header_height + $bv_padding)+'px'}));
  }
  &.only-footer {
    height: calc(100vh - calc(80px + #{($bv_footer_height + $bv_padding)+'px'}));
  }

}

.base-view-footer {
  padding: 15px;
  width: 100%;
  max-height: #{$bv_footer_height};
  display: flex;
  flex-direction: row;
  // background-color: aquamarine;
  margin-bottom: 5px;
  overflow: hidden;
}

</style>