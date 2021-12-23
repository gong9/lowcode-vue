<template>
  <div>
    {{ this.demo }}
    <VirtualScroller :data="list" :dataItemHeight="dataItemHeight" />
    <SelectVirtual
      placeholder="就不选择"
      :data="selectList"
      :dataItemHeight="dataItemHeight"
      labelKey="label"
      valueKey="value"
      filterable
      collapse-tags
      multiple
      style="width: 350px"
      v-model="demo"
    />
  </div>
</template>

<script>
import VirtualScroller from "./components/VirtualScroller";
import SelectVirtual from "./components/SelectVirtual";
const dataSorce = [];
const selectList = [];
for (let i = 0; i < 10000; i++) {
  dataSorce.push({ value: i });
}
// for (let i = 0; i < 100; i++) {
//   selectList.push({ value: i, label: i });
// }
export default {
  components: {
    VirtualScroller,
    SelectVirtual,
  },
  data() {
    return {
      list: dataSorce,
      dataItemHeight: 40,
      selectList: selectList,
      demo: [],
    };
  },
  mounted() {
    setTimeout(() => {
      for (let i = 0; i < 10000; i++) {
        selectList.push({ value: i, label: i });
      }
    }, 5000);
  },
};
</script>
