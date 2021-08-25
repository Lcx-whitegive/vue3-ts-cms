<template>
  <div class="rose-echart">
    <cx-base-echart :options="options" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
import CxBaseEchart from '@/base-ui/cx-base-echart/CxBaseEchart.vue'

import { EChartsOption } from 'echarts'

import { IRoseData } from './types'

import { defineProps, computed } from 'vue'

const props = defineProps<{
  roseData: IRoseData[]
  width?: string
  height?: string
}>()

const options: EChartsOption = computed(() => {
  return {
    // legend: {
    //   top: 'bottom'
    // },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
