<template>
  <div id="app">
    <LowCodeTable
      :data="tableData"
      :schema="tableSchema"
      emptyText="111"
      maxHeight="400"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import LowCodeTable from "./components/LowCodeTable";
export default {
  name: "App",
  components: {
    LowCodeTable,
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
              hide: ({ rowData }) => {
                if (rowData.name === "王si虎") return true;
              },
              click: (row) => {
                console.log(row);
              },
            },
            {
              type: "link",
              label: "编辑",
              props:{
                type:'primary'
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
      console.log("111");
    },
    paginationEvent() {
      console.log(123);
    },
  },
};
</script>

<style></style>
