import * as echarts from 'echarts'

import { EChartsOption } from 'echarts'

import ChinaMapData from '@/components/map-echart/china.json'

echarts.registerMap('china', ChinaMapData)

export default function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  const resize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', function () {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    resize
  }
}
