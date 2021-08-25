<template>
  <div class="cx-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handle">
          <slot name="headerHandle"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%"
      :height="height"
      @selection-change="selectionChange"
      v-bind="childrenProps"
    >
      <template v-if="showSelection">
        <el-table-column type="selection" width="40" align="center">
        </el-table-column>
      </template>
      <template v-if="showIndex">
        <el-table-column label="序号" type="index" width="50" align="center">
        </el-table-column>
      </template>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <template v-if="item.slotName">
              <slot :name="item.slotName" :row="scope.row"></slot>
            </template>
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="isShowFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.offset / queryInfo.size + 1"
          :page-sizes="[3, 4, 5, 6]"
          :page-size="queryInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['selectionChange', 'sizeChange', 'currentChange'],
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    propList: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: Number,
      default: 500
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    listCount: {
      type: Number,
      default: 0
    },
    queryInfo: {
      type: Object,
      required: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    isShowFooter: {
      type: Boolean,
      default: true
    }
  },
  setup(prop, { emit }) {
    // 多选变化
    const selectionChange = (selection: any) => {
      emit('selectionChange', selection)
    }
    // 每页显示条数变化
    const handleSizeChange = (pageSize: number) => {
      emit('sizeChange', pageSize)
    }
    // 页码变化
    const handleCurrentChange = (pageNum: number) => {
      emit('currentChange', pageNum)
    }
    return {
      selectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.cx-table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
  }
  .footer {
    text-align: center;
  }
}
</style>
