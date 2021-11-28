<template>
  <div>
    <lowcode-form-item :schema="schema1" dataSourceName="inputData" />
    <lowcode-form-item :schema="schema2" dataSourceName="inputData" />
    <lowcode-form-item :schema="schema3" dataSourceName="inputData" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      inputData: {
        input1: "1111",
        input2: "111",
        demo03: "",
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
      schema3: {
        type: "select",
        name: "demo03",
        placeholder: "下拉框请选择",
        options: [
          {
            value: "选项1",
            label: "黄金糕",
          },
          {
            value: "选项2",
            label: "双皮奶",
          },
          {
            value: "选项3",
            label: "蚵仔煎",
          },
          {
            value: "选项4",
            label: "龙须面",
          },
          {
            value: "选项5",
            label: "北京烤鸭",
          },
        ],
      },
    };
  },
};
</script>
