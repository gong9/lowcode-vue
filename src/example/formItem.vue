<template>
  <div>
    <lowcode-form-item :schema="schema1" dataSourceName="inputData" />
    <lowcode-form-item :schema="schema2" dataSourceName="inputData" />
    <lowcode-form-item :schema="schema3" dataSourceName="inputData" />
    <lowcode-form-item :schema="schema4" dataSourceName="inputData" />
    <lowcode-form-item :schema="schema5" dataSourceName="inputData" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      inputData: {
        demo01: "1111",
        demo02: "111",
        demo03: "",
        demo04: true,
        demo05: [],
      },
      schema1: {
        type: "input",
        name: "demo01",
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
        name: "demo02",
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
      schema4: {
        type: "switch",
        name: "demo04",
        props: {
          activeColor: "#13ce66",
          inactiveColor: "#ff4949",
          activeValue: "100",
          inactiveValue: "0",
        },
      },
      schema5: {
        type: "checkbox",
        name: "demo05",
        options: [
          {
            label: "选项1",
            value: "1",
          },
          {
            label: "选项2",
            value: "2",
          },
          {
            label: "选项3",
            value: "3",
          },
        ],
      },
    };
  },
};
</script>
