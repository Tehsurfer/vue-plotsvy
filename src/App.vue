<template>
  <div id="app">
  <div class="top-panel">
     <el-button v-if="displays.length > 0" @click="RemoveData" class="my-button" size="small">Remove Model</el-button>
       <el-button v-if="csvFiles.length > 0" @click="AddData" class="my-button" size="small">Add Data</el-button>
  </div>
   <el-tabs :tab-position="tabPosition" style="top:10%;height:90%'">
        <el-tab-pane v-for="item in displays" :key="item.ref" :label="item.ref" style="height:100%">
          <PlotVuer :url="item.url" :name="item.ref" style="height:100%"></PlotVuer>
        </el-tab-pane>
       </el-tabs>
 
  </div>
</template>

<script>
import { Button, Tabs, TabPane} from 'element-ui' 
import PlotVuer from './components/PlotVuer'
import Vue from 'vue'
Vue.use(Button)
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
export default {
  name: 'app',
  components: {
    PlotVuer
  },
  data: function(){
    return {
      tabPosition: 'left',
      displays: [],
      csvFiles: [ 
        {type: 'plot', url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/sample_2/cell_1/18525003_channel_1.csv', ref: 'Stellate Stimulation'},
        {type: 'plot', url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-1/P1760+IVC+Occ+trimed.csv', ref: 'Heart ECG recording'},
        {type: 'plot', url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-4/RNA_Seq.csv', ref: 'RNA Sequences'}
      ] 
    }   
  },
  methods: {
    RemoveData: function() {
      this.csvFiles.push(this.displays.pop())
    },
    AddData: function () {
      this.displays.push(this.csvFiles.pop())
    }
  }

  
}
</script>

<style>
body {
  margin: 0px
}
#app {
  padding:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width: 100%;
  position:absolute;
}
.top-panel {
  padding:1%;
  height: 4%;
}
.my-button {
  margin:5px;
}
.el-tabs__content {
  height:100%;
}
</style>