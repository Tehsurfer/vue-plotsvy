<template>
  <div id="app" ref="app">
    <vue-plotly
      id="chart"
      ref="plotly"
      :data="pdata"
      :layout="layout"
      :options="options"
      :autoResize="true"
      @hover="layout.title='hovering on plotly'"

    />
    <el-input placeholder="Enter Title Here" v-model="layout.title"></el-input>

    <el-select v-model="url" @change="layout.title=url; loadURL(url)"  placeholder="Select a csv file">
      <el-option
        v-for="file in csvFiles"
        :key="file"
        :label="file"
        :value="file">
      </el-option>
    </el-select>
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
import {Input, Select, Option} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CsvManager from "./csv_manager"
var csv = new CsvManager()
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
export default {
  name: "PlotVuer",
  components: { VuePlotly },
  props: ["csvFiles"],
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
      url: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/sample_2/cell_1/18525003_channel_1.csv",
      channel: 'Select a channel'
    };
  },
  computed: {
  },
  methods: {

    loadURL: function(url) {
      csv.loadFile(url).then(_ => {
        this.pdata[0].x = csv.getColoumnByIndex(0).shift();
        this.pdata[0].y = csv.getColoumnByIndex(1).shift();
        this.pdata[0].type = csv.getDataType()
        this.items = csv.getHeaders();
        return true
      });
    },
    hoverd: function() {
      this.layout.title = "We are hovering!!"
    },
    plot: function(channel){
      this.layout.title = channel
      window.pdata = this.pdata
      this.pdata[0].y = csv.getColoumnByName(channel)
    },
    handleResize: function (){
      this.layout.title = 'Width adjusted to:' + this.$refs.app.clientWidth
      this.$refs.plotly.relayout({width: this.$refs.app.clientWidth, })
      window.reeefs = this.$refs
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
