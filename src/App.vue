<template>
  <div id="app">
    <div>
      <!-- <FormItemDemo /> -->
    </div>
    <div>
      <FormDemo />
    </div>
    <div>
      <!-- <TableDemo /> -->
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
    // TableDemo,
    FormDemo,
    // FormItemDemo,
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
