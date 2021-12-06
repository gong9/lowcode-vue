<template>
  <div>
    {{ formData }}
    <lowcode-form-search :schema="formSchema" dataSourceName="formData">
    </lowcode-form-search>
    <lowcode-table
      ref="multipleTable"
      :data="tableData"
      :schema="tableSchema"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script>
import moment from "moment";
import City from "./custom/City.vue";

export default {
  name: "App",
  components: {
    // City,
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
      tableSchema: {
        type: "table",
        props: {
          emptyText: "没有数据啊",
        },
        body: [
          { type: "selection" },
          {
            name: "date",
            label: "日期",
            props: {
              sortable: true,
            },
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
                label: "切换二三行选中状态",
                props: {
                  type: "primary",
                },
                click: () => {
                  this.toggleSelection([this.tableData[1], this.tableData[2]]);
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
      },
      formSchema: {
        type: "form-search",
        props: {
          maxLine: "1",
        },
        body: [
          {
            type: "input",
            label: "姓名",
            name: "name",
          },
          {
            type: "select-city",
            name: "city",
            label: "我是自定义组件",
            render: () => {
              return <City />;
            },
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
            type: "select",
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
          // 用户自定的局部注册组件，目前需要借助一些插槽
          {
            type: "city",
            label: "选择城市",
            name: "grade",
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
      },
      formData: {
        name: "111",
        age: "19",
        grade: "",
        city: 11,
        time: [
          moment().subtract(30, "days").startOf("day").valueOf(),
          moment().endOf("day").milliseconds(0).valueOf(),
        ],
        select01: "",
      },
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
    handleSelectionChange(val) {
      console.log(val);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.tableRef.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.tableRef.clearSelection();
      }
    },
  },
};
</script>
