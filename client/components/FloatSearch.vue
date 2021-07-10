<template>
    <div class="float-filter" :class="{'filter-focus': inputFocus}">
      <div class="">
        <span v-show="!isSearching" class="fas fa-search icon-search"></span>
        <span v-if="isSearching" class="fas fa-circle-notch fa-spin icon-search"></span>
        <input 
          type="text" 
          @focus="inputFocus=true" 
          @blur="inputFocus=false" 
          :placeholder="$t('SEARCH')"
          v-model="search"
        >
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        inputFocus: false,
        search: null,
        time: 0,
        isSearching: false
      }
    },
    methods: {
      
    },

    computed: {
      valida() {
        return  !!this.inputFocus
      }
    },

    watch: {
      search(val) {
        this.isSearching = true
        clearInterval(this.time)
        this.time = setInterval(() => {
          this.$emit('search', val)
          clearInterval(this.time)
          this.isSearching = false
        }, 1000)
      },
    }
  }
</script>

<style lang="scss" scoped>
.float-filter {
  position: absolute;
  float: left;
  top: 20px;
  left: calc(100% - 360px);
  z-index: 1;
  opacity: 50%;

  &.filter-focus {
    opacity: 100%;
  }

  &:hover {
    opacity: 100%;
  }

  .icon-search {
    position: absolute;
    color: #999;
    left: 23px;
    top: 12px;
  }

  input[type="text"] {
      background: #ccc;
      border: 0 none;
      color: #6a6f75;
      width:130px;
      padding: 6px 15px 6px 35px;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
      margin:3px 12px;
  }

  input[type="text"]:focus,
  input[type="text"]:hover {
      background:rgb(231, 231, 231);
      color: #6a6f75;
      width: 300px;    
      margin:3px 12px;
      outline: none;
      // border: 1px solid #666;
  }

  input[type="text"] {
      -webkit-transition: all 0.7s ease 0s;
      -moz-transition: all 0.7s ease 0s;
      -o-transition: all 0.7s ease 0s;
      transition: all 0.7s ease 0s;
  }
}
</style>