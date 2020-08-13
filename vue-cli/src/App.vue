<template>
  <div>
    {{str}}
    <app-header></app-header>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
/* 
밑에랑 같은의미 ver2
new Vue({
  data:{
    str:"hi"
  }
}) */

export default {
  data:function(){
    return {str:"hi"
    }
  },
  components:{
    "app-header":AppHeader
  }
}
</script>

<style>

</style>