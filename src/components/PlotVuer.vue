<template>
  <div id='app'>
    <vue-plotly
      id="chart"
      ref="plotly"
      :data="pdata"
      :layout="layout"
      :options="options"
      :autoResize="true"
    />
    <el-select v-model="channel" @change="plot(channel)"  placeholder="Select a channel">
      <el-option
        v-for="item in items"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import VuePlotly from "@statnett/vue-plotly"
import Vue from "vue"
import {Select, Option} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CsvManager from "./csv_manager"
var csv = new CsvManager()
Vue.use(Select)
Vue.use(Option)
export default {
  name: "PlotVuer",
  components: { VuePlotly },
  props: ["url"],
  data: function() {
    return {
      items: ['first', 'second', 'third'],
      pdata: [{ x: ['1', '2', '3', '4'], y: [10, 25, 20, 50], type: 'scatter' }],
      layout: {
        title: "edit this title"
      },
      testSelect: ['one', 'two', 'three', 'four'],
      options: {},
      input: '',
      channel: 'Select a channel'
    };
  },

  methods: {

    loadURL: function(url) {
      csv.loadFile(url).then(_ => {
        this.pdata[0].x = csv.getColoumnByIndex(0).shift();
        this.pdata[0].y = csv.getColoumnByIndex(1).shift();
        this.pdata[0].type = csv.getDataType()
        this.items = csv.getHeaders();
        this.plot(csv.getHeaderByIndex(1))
        return true
      });
    },
    plot: function(channel){
      this.layout.title = channel
      window.pdata = this.pdata
      this.pdata[0].y = csv.getColoumnByName(channel)
    },
    handleResize: function (){
      this.layout.title = 'Width adjusted to:' + this.$refs.app.clientWidth
      this.$refs.plotly.relayout({width: this.$refs.app.clientWidth, })
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.loadURL(this.url)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
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

</style>
