<template>
  <div class="pie-echart">
    <cx-base-echart :options="options" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
import CxBaseEchart from '@/base-ui/cx-base-echart/CxBaseEchart.vue'

import { IPieData } from './types'

import { defineProps, computed } from 'vue'

import { EChartsOption } from 'echarts'

const props = defineProps<{
  pieData: IPieData[]
  width?: string
  height?: string
}>()

const options: EChartsOption = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
