<template>
  <div id="app">
    {{ this.formData.name }}
    {{ this.formData.age }}
    {{ this.formData.select01 }}
    <LowCodeForm
      :data="formData"
      :schema="formSchema"
      dataSourceName="formData"
    />
    <LowCodeTable
      :data="tableData"
      :schema="tableSchema"
      emptyText="没有数据"
      maxHeight="400"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import LowCodeTable from "./components/LowCodeTable";
import LowCodeForm from "./components/LowCodeForm";
export default {
  name: "App",
  components: {
    LowCodeTable,
    LowCodeForm,
  },
  computed: {
    pagination() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 100,
        event: this.paginationEvent,
      };
    },
  },
  data() {
    return {
      tableSchema: [
        {
          name: "date",
          label: "日期",
        },
        {
          name: "name",
          label: "姓名",
        },
        {
          name: "address",
          label: "地址",
        },
        {
          type: "operation",
          label: "操作",
          props: {
            fixed: "right",
          },
          actions: [
            {
              type: "link",
              label: "查看",
              // hide: ({ rowData }) => {
              //   if (rowData.name === "王si虎") return true;
              // },
              click: (row) => {
                console.log(row);
              },
            },
            {
              type: "link",
              label: "编辑",
              props: {
                type: "primary",
              },
              click: (row) => {
                console.log(row);
              },
            },
          ],
        },
      ],
      tableData: [
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王er虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王san虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王si虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      formData: {
        name: "111",
        age: "19",
        select01: "",
      },
      formSchema: [
        {
          type: "input",
          label: "姓名",
          name: "name",
        },
        {
          type: "input",
          label: "年龄",
          name: "age",
        },
        {
          type: "select-sc",
          label: "单选下拉框",
          name: "select01",
          placeholder: "自定义",
          options: [
            {
              label: "选项1",
              value: 1,
            },
            {
              label: "选项2",
              value: 2,
            },
            {
              label: "选项3",
              value: 3,
            },
          ],
        },
        {
          type: "select-mc",
          label: "单选下拉",
          name: "demo02",
        },
        {
          type: "actions",
          body: [
            {
              type: "button",
              label: "搜索",
              click: () => {
                console.log(111);
              },
            },
            {
              type: "button",
              label: "导出",
              click: () => {
                console.log(222);
              },
            },
            {
              type: "link",
              label: "查询导出结果",
              click: () => {
                this.demo();
              },
            },
          ],
        },
      ],
    };
  },
  methods: {
    demo() {
      console.log(this.formData);
    },
    paginationEvent() {
      console.log(123);
    },
  },
};
</script>

<style></style>
