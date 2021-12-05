<template>
  <div>
    <el-button @click="handelVal">{{ value }}</el-button>
  </div>
</template>
<script>
import handleCostomMixins from "../../mixins/custom";
export default {
  data() {
    return {
      value: "",
    };
  },
  mixins: [handleCostomMixins],
  methods: {
    handelVal() {
      this.value += 1;
    },
  },
};
</script>

<style scoped></style>
