<template>
  <div>
    <lowcode-form-item :schema="schema1" dataSourceName="inputData" />
    <lowcode-form-item :schema="schema2" dataSourceName="inputData" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      inputData: {
        input1: "1111",
        input2: "111",
      },
      schema1: {
        type: "input",
        name: "input1",
        placeholder: "请输入内容",
        disabled: false,
        slot: (h) => {
          return <i slot="suffix" class="el-input__icon el-icon-date"></i>;
        },
        props: {
          clearable: true,
        },
      },
      schema2: {
        type: "input",
        name: "input2",
        placeholder: "请输入密码",
        disabled: false,
        props: {
          clearable: true,
          showPassword: true,
          suffixIcon: "el-icon-date",
        },
      },
    };
  },
};
</script>
