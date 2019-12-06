import Vue from 'vue'
import App from './App.vue'


window.vuue = new Vue({
  el: '#entry',
  components: {App},
  data: function(){
    return{
      testy:'this is a test'
    }
  },
  template: '<app :testy="testy"/>'
})


