<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <cx-card title="分类商品数量(饼图)">
          <pie-echart height="300px" :pieData="categoryGoodsCount" />
        </cx-card>
      </el-col>
      <el-col :span="10">
        <cx-card title="不同城市商品销量">
          <map-echart height="300px" :mapData="addressGoodsSale" />
        </cx-card>
      </el-col>
      <el-col :span="7">
        <cx-card title="分类商品数量(玫瑰图)">
          <rose-echart height="300px" :roseData="categoryGoodsCount" />
        </cx-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <cx-card title="分类商品的销量">
          <line-echart height="200px" v-bind="categoryGoodsSale" />
        </cx-card>
      </el-col>
      <el-col :span="12">
        <cx-card title="分类商品的收藏">
          <bar-echart height="200px" v-bind="categoryGoodsFavor" />
        </cx-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import CxCard from '@/base-ui/cx-card/CxCard.vue'
import PieEchart from '@/components/pie-echart/PieEchart.vue'
import RoseEchart from '@/components/rose-echart/RoseEchart.vue'
import LineEchart from '@/components/line-echart/LineEchart.vue'
import BarEchart from '@/components/bar-echart/BarEchart.vue'
import MapEchart from '@/components/map-echart/MapEchart.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    CxCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()

    store.dispatch({
      type: 'dashboardModule/getDashboardDataAction'
    })

    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale
      categoryGoodsSale.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      })

      return {
        xLabels,
        values
      }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboardModule.categoryGoodsFavor
      categoryGoodsFavor.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      })

      return {
        xLabels,
        values
      }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style lang="less" scoped>
.dashboard {
  .content-row {
    margin-top: 10px;
  }
}
</style>
