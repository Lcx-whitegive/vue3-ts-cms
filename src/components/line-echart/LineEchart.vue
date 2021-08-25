<template>
  <div class="line-echart">
    <cx-base-echart :options="options" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
import CxBaseEchart from '@/base-ui/cx-base-echart/CxBaseEchart.vue'

import { defineProps, computed } from 'vue'

const props = defineProps<{
  xLabels: string[]
  values: any[]
  width?: string
  height?: string
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分别销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
