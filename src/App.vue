<template>
  <div id="app">
    <div>
      <h3>基础表单项配置化</h3>
      <FormItemDemo />
    </div>
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
import FormItemDemo from "./example/formItem.vue";

export default {
  name: "App",
  components: {
    TableDemo,
    FormDemo,
    FormItemDemo,
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
