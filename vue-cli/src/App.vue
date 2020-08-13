<template>
  <div>
    <app-header v-bind:propsdata="str"
    v-on:renew="renewStr"></app-header>
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
    return {str:"Header"
    }
  },
  components:{
    "app-header":AppHeader
  },
  methods:{
    renewStr:function(){
      this.str='hi'
    }
  }
  
}
</script>

<style>

</style>