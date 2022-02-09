<template>
  <div>
    <div @click="$emit('click')" class="quick-access-item d-flex justify-content-center flex-wrap align-items-center">
      <div class="item new-tithe">
        <h4>{{ title }}</h4>
        <div class="text-center">
          <i style="font-size: 32px" :class="classIcon"></i>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
  export default {
    props: ['title', 'classIcon']
  }
</script>

<style lang="scss" scoped>
.quick-access-item {
  padding: 10px;
  width: 200px;
  height: 140px;
  border-radius: 15px;
  border: solid 1px #dadada;
  background-color: #fff;
  -webkit-box-shadow: 3px 3px 17px 0px rgba(112,112,112,0.25); 
  box-shadow: 3px 3px 17px 0px rgba(112,112,112,0.25);

  &:hover {
    border: solid 2px #dadada;
    cursor: pointer;
    -webkit-box-shadow: 3px 3px 17px 0px rgba(112,112,112,0.5); 
    box-shadow: 3px 3px 17px 0px rgba(112,112,112,0.5);

  }
}
</style>