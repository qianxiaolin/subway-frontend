<template>

<div class="echartsmap" id="main" style="width:100%;height: 100%;overflow: hidden;">
    
</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import * as echarts from 'echarts';
import {option} from '../Echarts/index'
// 基于准备好的dom，初始化echarts实例
const DrowMap=()=>{
  var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption(option);
}
onMounted(DrowMap)

</script>