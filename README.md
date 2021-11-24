## table

#### 简单使用

```js
// template
 <LowCodeTable
      :data="tableData"
      :schema="tableSchema"
    />

// script
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
        }
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

```
#### 某一列需要数据过滤
对应调整：tableSchema
```js
    // handleData是随便定义的数据处理函数 
      tableSchema: [
        {
          name: "date",
          label: "日期",
          render:({value})=>{
              return handleData(value)
          }
        },
        {
          name: "name",
          label: "姓名",
        },
        {
          name: "address",
          label: "地址",
        }
      ],
```
#### 提供某一列的自定义渲染能力
```js
  // handleData是随便定义的数据处理函数 
      tableSchema: [
        {
          name: "date",
          label: "日期",
          render:({value})=>{
              return (
                  <div>
                    <span>自渲染能里</span>
                    <button>{value}</button>
                  </div>
              )
          }
        },
        {
          name: "name",
          label: "姓名",
        },
        {
          name: "address",
          label: "地址",
        }
      ],
```
#### 支持属性透传
```js
  tableSchema: [
        {
          name: "date",
          label: "日期",
          props:{
            width: "100"
          }
          render:({value})=>{
              return (
                  <div>
                    <span>自渲染能里</span>
                    <button>{value}</button>
                  </div>
              )
          }
        },
        {
          name: "name",
          label: "姓名",
          props:{
            width: "100"
          }
        },
        {
          name: "address",
          label: "地址",
        }
      ],
```
#### 支持操作列
操作列一般渲染的均是个按钮，故支持一个click函数去注册到此操作按钮。click中的row参数包含当前行的所有数据
```js
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
              click: (row) => {
                console.log(row);
              },
            }
          ],
        },
      ],
```
#### 支持操作列某些行为按钮显示隐藏行为
hide 函数 可以根据当前行的属性，进行选择性的现实或隐藏此行为按钮
```js
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
              click: (row) => {
                console.log(row);
              },
            },
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
          ],
        },
      ],
```