<template>
  <div id="app">
    <div>
      <h3>表单配置化</h3>
      <FormDemo />
    </div>
    <div class="curd">
      <h3>表格&搜索表单配置化</h3>
      <LowCodeFormSearch
        :schema="formSchema"
        dataSourceName="formData"
        maxLine="1"
      />
      <LowCodeTable
        :data="tableData"
        :schema="tableSchema"
        emptyText="没有数据"
        maxHeight="400"
        :pagination="pagination"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import LowCodeTable from "./components/LowCodeTable";
import LowCodeFormSearch from "./components/LowCodeFormSearch";
import FormDemo from "./example/form.vue";

export default {
  name: "App",
  components: {
    LowCodeTable,
    LowCodeFormSearch,
    FormDemo,
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
              click: (row) => {},
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

      formData: {
        name: "111",
        age: "19",
        grade: "",
        time: [
          moment().subtract(30, "days").startOf("day").valueOf(),
          moment().endOf("day").milliseconds(0).valueOf(),
        ],
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
          type: "input",
          label: "班级",
          name: "grade",
        },
        {
          type: "input-time",
          label: "选择时间",
          name: "time",
          props: {
            type: "daterange",
            defaultTime: ["00:00:00", "23:59:59"],
            placeholder: "选择日期",
            style: "width: 100%;",
          },
        },
        {
          type: "select-sc",
          label: "单选下拉框",
          name: "select01",
          // placeholder: "自定义",
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
          type: "actions",
          body: [
            {
              type: "button",
              label: "搜索",
              click: () => {
                console.log(this.formData);
                // 搜索逻辑
              },
            },
            {
              type: "link",
              label: "查询导出结果",
              click: () => {
                // 具体导出逻辑
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
    };
  },
  methods: {
    paginationEvent() {
      console.log(123);
    },
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
