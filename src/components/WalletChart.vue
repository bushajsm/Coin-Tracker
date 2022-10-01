<template>
    <Pie
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
      :key="componentKey"
    />
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs/legacy';
  import { mapGetters } from "vuex";
  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
  
  export default {
    name: 'PieChart',
    components: {
      Pie
    },
    props: {
      chartId: {
        type: String,
        default: 'pie-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 300
      },
      height: {
        type: Number,
        default: 300
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        componentKey: 0,
        chartData: {
          labels: [],
          datasets: [
            {
              backgroundColor: ['#FFBF00','#8F00FF','#FF69B4','#04D435', '#E46651', '#00D8FF', '#DD1B16'],
              data: []
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
        }
      }
    },
    created(){
        this.labels.length!==0?this.chartData.labels=this.labels:this.chartData.labels=['No Data To Dispaly'];
        this.datasets.length!==0?this.chartData.datasets[0].data=this.datasets:this.chartData.datasets[0].data=[1];
        //this.chartData.datasets[0].data=this.datasets;
    },
    computed: {
    ...mapGetters(["labels","datasets"]),
  },
  watch:{
    labels(){
      this.labels.length!==0?this.chartData.labels=this.labels:this.chartData.labels=['No Data To Dispaly'];
      this.datasets.length!==0?this.chartData.datasets[0].data=this.datasets:this.chartData.datasets[0].data=[0];
       
    },
    datasets(){
      this.labels.length!==0?this.chartData.labels=this.labels:this.chartData.labels=['No Data To Dispaly'];
      this.datasets.length!==0?this.chartData.datasets[0].data=this.datasets:this.chartData.datasets[0].data=[0];
       
    }
    
}
}
  </script>
  