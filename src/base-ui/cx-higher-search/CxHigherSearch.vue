<template>
  <div class="cx-higher-search">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :model="formData" ref="searchFormRef">
      <el-row>
        <template v-for="item in searchItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                >
                  <el-option
                    v-for="o in item.options"
                    :key="o.value"
                    :label="o.label"
                    :value="o.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { ISearchItem } from './types'

import { ElForm } from 'element-plus'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    searchItems: {
      type: Array as PropType<ISearchItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => {
        return {
          padding: '10px 2px'
        }
      }
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    }
  },
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    const searchFormRef = ref<InstanceType<typeof ElForm>>()
    // 重置表单
    const resetForm = () => {
      formData.value = {}
    }
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )

    return {
      formData,
      resetForm,
      searchFormRef
    }
  }
})
</script>

<style lang="less" scoped>
.cx-higher-search {
  .footer {
    text-align: right;
    padding: 0 15px 10px 0;
  }
}
</style>
