<template>
  <div id="app" ref="app" :testy="testy">
    <vue-plotly
      id="chart"
      ref="plotly"
      :data="pdata"
      :layout="layout"
      :options="options"
      :autoResize="true"
      @hover="layout.title='hovering on plotly'"

    />
    <dat-gui closeText="Close controls" openText="Open controls" closePosition="bottom">
      <dat-string v-model="layout.title" label="Title" />
      <dat-button @click="plot()" label="Trigger alert"/>
      <dat-string v-model="url" label="Load CSV" />
      <dat-button v-for="item in items" v-bind:key="item" v-bind:label="item" @click="plot(item)"/>

    </dat-gui>
    <button
      id="external-button"
      @mouseover="hoverd()"
      @click="calculateWidth()"
    >Resize Plot</button>
    <h3>title: {{layout.title}}</h3>
    <h3>y array: {{pdata[0].y}}</h3>
    <h3>{{loadURL}}</h3>
    <h2> {{ testy ? testy : 'test failed!' }}</h2>
    <contact-info
      :email-address="emailAddress"
      :twitter-handle="twitterHandle"
      :instagram="instagram"
    />
  </div>
</template>
<script>
import VuePlotly from "@statnett/vue-plotly";
import Vue from "vue";
import DatGui from "@cyrilf/vue-dat-gui";
import ContactInfo from "./contact_info";
import CsvManager from "./csv_manager";
var csv = new CsvManager();
window.VuePlotly = VuePlotly;
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
      autoResize: true,
      options: {},

      url:
        "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/sample_2/cell_1/18525003_channel_1.csv",
      emailAddress: "jessekhorasanee@gmail.com",
      twitterHandle: "tehsurfer",
      instagram: "khorasanee"
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
