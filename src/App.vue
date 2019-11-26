<template>
  <div id="app">
    <vue-plotly :data="data" :layout="layout" :options="options"/>
    <dat-gui closeText="Close controls" openText="Open controls" closePosition="bottom">
      <dat-string v-model="layout.title" label="Title" />
      <dat-number v-model="data[0].y[0]" :min="-100" :max="100" :step="1" label="Adjust y1"/>
      <dat-number v-model="data[0].y[1]" :min="-100" :max="100" :step="1" label="Adjust y2"/>
      <dat-number v-model="data[0].y[2]" :min="-100" :max="100" :step="1" label="Adjust y3"/>
      <dat-number v-model="data[0].y[3]" :min="-100" :max="100" :step="1" label="Adjust y4"/>
    </dat-gui>
    <h3>title: {{layout.title}}</h3>
    <h3>y array: {{data[0].y}}</h3>
  </div>
</template>

<script>
import VuePlotly from '@statnett/vue-plotly'
import Vue from "vue";
import DatGui from "@cyrilf/vue-dat-gui";
Vue.use(DatGui);

export default {
  name: "app",
  components: { VuePlotly },
  data: function() {
    return {
      x: [1,2,3,4],
      y: [10, 15, 13, 17],
      msg: "Welcome to Your Vue.js App",
      data: [{ x: [1, 2, 3, 4], y: [10, 25, 20, 50] }],
      layout: {title:'edit this title'},
      options: {}
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
