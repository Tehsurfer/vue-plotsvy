import Vue from 'vue'
import App from './App.vue'


window.vuue = new Vue({
  el: '#app',
  components: {App},
  render: h => h(App),
  data: function(){
    return{
      testy:'this is a test'
    }
  }
})


