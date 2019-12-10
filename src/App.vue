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

    <el-select v-model="url" @change="layout.title=url; loadURL()"  placeholder="Select">
      <el-option
        v-for="file in csvFiles"
        :key="file"
        :label="file"
        :value="file">
      </el-option>
    </el-select>
    <el-select v-model="value" @change="plot(value)"  placeholder="Select">
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
import VuePlotly from "@statnett/vue-plotly";
import Vue from "vue";
import DatGui from "@cyrilf/vue-dat-gui";
import ContactInfo from "./contact_info";
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CsvManager from "./csv_manager";
import { loadavg } from "os";
var csv = new CsvManager();
window.VuePlotly = VuePlotly;
Vue.use(Element);
Vue.use(DatGui);
var hi = "hi";
var exx = {
  name: "app",
  components: { VuePlotly, ContactInfo },
  props: ["testy"],
  data: function() {
    return {
      items: ['first', 'second', 'third'],
      pdata: [{ x: ['1', '2', '3', '4'], y: [10, 25, 20, 50], type: 'scatter' }],
      layout: {
        title: "edit this title"
      },
      csvFiles: ['https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/sample_2/cell_1/18525003_channel_1.csv', 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-1/P1760+IVC+Occ+trimed.csv', 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-4/RNA_Seq.csv'],
      testSelect: ['one', 'two', 'three', 'four'],
      options: {},
      input: '',
      url:
        "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/sample_2/cell_1/18525003_channel_1.csv",
    };
  },
  computed: {
    loadURL: function() {
      csv.loadFile(this.url).then(_ => {
        this.pdata[0].x = csv.getColoumnByIndex(0).shift();
        this.pdata[0].y = csv.getColoumnByIndex(1).shift();
        this.pdata[0].type = csv.getDataType()
        this.items = csv.getHeaders();
      });
    },
 
    initialiseResizeListener: function(resizeObject) {
      resizeObject.addEventListener("resize", _ => {
        VuePlotly.relayout(chartDiv, {
          width: resizeObject.innerWidth,
          height: resizeObject.innerHeight + 150
        });
      });
    },
    
  },
  methods: {
    hoverd: function() {
      this.layout.title = "We are hovering!!"
    },
    plot: function(channel){
      this.layout.title = channel
      console.log(this.pdata)
      window.pdata = this.pdata
      this.pdata[0].y = csv.getColoumnByName(channel)
    },
    
    calculateWidth: function (){
      this.layout.title = this.$refs.app.clientWidth
      this.$refs.plotly.relayout({width: this.$refs.app.clientWidth, })
      window.reeefs = this.$refs
    },
    handleResize: function (){
      this.layout.title = this.$refs.app.clientWidth
      this.$refs.plotly.relayout({width: this.$refs.app.clientWidth, })
      window.reeefs = this.$refs
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    this.loadURL()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
};

window.exx = exx;
export default exx;
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
