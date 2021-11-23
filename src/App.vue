<template>
  <div id="app">
    <LowCodeTable :data="tableData" :schema="tableSchema" stripe />
  </div>
</template>

<script>
import LowCodeTable from "./components/LowCodeTable";

// 一些数据处理过滤处理
const handleColData01 = (value) => {
  return value ? value : "-";
};

export default {
  name: "App",
  components: {
    LowCodeTable,
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
          actions: [
            {
              type: "link",
              label: "详情",
              hide: ({ rowData }) => {
                if (rowData.name === "王si虎") return true;
              },
              click: (row) => {
                console.log(row);
              },
            },
            {
              type: "link",
              label: "删除",
              click: (row) => {
                console.log(row);
              },
            },
            {
              type: "link",
              label: "修改",
              click: (row) => {
                console.log(row);
              },
            },
          ],
        },
      ],
      tableData: [
        {
          date: "",
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
    };
  },
  methods: {
    demo() {
      console.log("我看看this指向还正确吗");
    },
  },
};
</script>

<style></style>
