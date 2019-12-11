<template>
  <div id="app">
    <PlotVuer :csvFiles="csvFiles"></PlotVuer>
  </div>
</template>

<script>
import PlotVuer from './components/PlotVuer'
export default {
  name: 'app',
  components: {
    PlotVuer
  },
  data: function(){
    return {
      csvFiles: ['https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/sample_2/cell_1/18525003_channel_1.csv', 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-1/P1760+IVC+Occ+trimed.csv', 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-4/RNA_Seq.csv'],
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width: 100%;
  position:absolute;
}
body {
  margin: 0px;
}
</style>