<template>
  <div id="app">
    <div>
      <h3>表单配置化</h3>
      <FormDemo />
    </div>
    <div>
      <h3>表格&搜索表单配置化</h3>
      <TableDemo />
    </div>
  </div>
</template>

<script>
import TableDemo from "./example/curd.vue";
import FormDemo from "./example/form.vue";

export default {
  name: "App",
  components: {
    TableDemo,
    FormDemo,
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
