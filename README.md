# 配置化组件封装

## lowcode-form-search

一般与 table 配合使用的表单搜索组件

仍然保持表单控件与 data 的双向绑定。

#### 基本使用
dataSourceName为必传属性，值为data中定义的表单数据对象名字 如下的formData

formSchema内属性接受
- type： 标名这次要渲染的基础表单控件 eg input
- label：此基础表单控件的lable
- name： 与formData中的属性key对应，即：此基础表单控件数据发生改变后，因存在双向数据绑定。使得formData中的对应数据也随着改变

```js
/ template
 <LowCodeForm
      :data="formData"
      :schema="formSchema"
      dataSourceName="formData"
    />

// script data中

     {
      formData: {
        name: "111"
        age: "19"
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
      ],
     }

```

#### 下拉框

```js
{
      formData: {
        select01: "",
      },
      formSchema: [
         {
          type: "select-sc",
          label: "单选下拉框",
          name: "select01",
          placeholder: "自定义请选择",
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
      ],
     }
```

##### 其他常用表单控件待补充
- 时间区间选择
- ...

#### 操作行为按钮  eg:（搜索、下载等行为操作）

click 函数将作为行为按钮的点击事件处理函数

暂时只支持 button、link 两种类型的行为组件

```js
formSchema: [
  {
    type: "actions",
    body: [
      {
        type: "button",
        label: "搜索",
        click: () => {},
      },
      {
        type: "link",
        label: "查询导出结果",
        click: () => {},
      },
    ],
  },
];
```

#### form-search中提供的表单控件没有符合预期？ 提供组件自定义的能力

## lowcode-table

#### 简单使用

原 table 的属性和事件直接放到 LowCodeTable 组件上即可

```js
// template
 <LowCodeTable
      :data="tableData"
      :schema="tableSchema"
      :emptyText="没有数据"
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

操作列一般渲染的均是个按钮，故支持一个 click 函数去注册到此操作按钮。click 中的 row 参数包含当前行的所有数据

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
