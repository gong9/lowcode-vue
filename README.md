<h1 align="center">Welcome to lowcode-vue-element 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

## Show your support

Give a ⭐️ if this project helped you!


## 一：table

table 暂时未使用 blm-table 进行封装，因为 blm-table 存在一些 bug。eg：排序

### 1. 基本使用

![截屏2021-12-06 下午6.05.29](https://s3.bmp.ovh/imgs/2021/12/e60cff59f6ab0cad.png)

```vue
<template>
  <div>
    <lowcode-table :data="tableData" :schema="tableSchema" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableSchema: {
        type: "table",
        body: [
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
        ],
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
};
</script>
```

### 2. 添加 events or props

约定: locoed-table 只接受**data**、**schema**、**ref** 属性

需要传递给其内部代理 table 组件的属性需要放到`schema`中，事件可以直接放到这里

```html
<lowcode-table :data="tableData" :schema="tableSchema" @row-click="" />
```

#### 2.1 给代理 table 添加属性

table 组件的属性需要放到其 schema 的 props 中

eg：add empty-text 属性

![](https://s3.bmp.ovh/imgs/2021/12/2f4501b725941c13.png)

```vue
<template>
  <div>
    <lowcode-table :data="tableData" :schema="tableSchema" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableSchema: {
        type: "table",
        props: {
          emptyText: "没有数据啊",
        },
        body: [
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
        ],
      },
    };
  },
};
</script>
```

#### 2.2 监听代理 table 触发的事件

![](https://s3.bmp.ovh/imgs/2021/12/bea49945c0f4de4f.png)

```vue
<lowcode-table :data="tableData" :schema="tableSchema" @row-click="" />
```

#### 2.3 给代理 table 的每一列添加属性

eg：日期排序

在对应列的配置中再添加 props 即可

![](https://s3.bmp.ovh/imgs/2021/12/f5594fab81744f8a.png)

```js
      tableSchema: {
        type: "table",
        props: {
          emptyText: "没有数据啊",
        },
        body: [
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
          }
        ],
      },
```

#### 2.4 多选

element 中： 手动添加一个`el-table-column`，设`type`属性为`selection`即可

这里也一样，多添加一列配置。
![](https://s3.bmp.ovh/imgs/2021/12/c2501529b4cb5092.png)

```vue
<template>
  <div>
    <lowcode-table
      :data="tableData"
      :schema="tableSchema"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script>
export default {
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
        ],
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
    handleSelectionChange(val) {
      console.log(val);
    },
  },
};
</script>
```

### 3. 获取代理 table 实例

由于直接给`<lowcode-table/>`组件设置 ref 属性，通过 refs 拿到的是`lowcode-table`组件的实例。但是这里我们需要拿到是它内部的 table 组件。所以暂时可以这样去拿

```html
<lowcode-table
  :data="tableData"
  :schema="tableSchema"
  ref="multipleTable"
  @selection-change="handleSelectionChange"
/>
```

table 实例：`this.$refs.multipleTable.tableRef`

### 4. 插槽能力

场景：某一列的数据需要做过滤操作，或者某一列需要自定义渲染

为每一列配置提供了一个 render 函数，如果使用了 render 函数，那么此列数据就会取该 render 函数的返回值，原数据可以从 render 函数的参数中获取

![](https://s3.bmp.ovh/imgs/2021/12/3cf6bf77daf7b5ff.png)

```vue
<template>
  <div>
    <lowcode-table :data="tableData" :schema="tableSchema" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableSchema: {
        type: "table",
        body: [
          {
            name: "date",
            label: "日期",
            render: ({ value }) => {
              return value + "数据改造";
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
        ],
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
};
</script>
```

同时该 render 函数也是可以使用 jsx 实现自定义渲染能力的

eg：将日期列渲染为按钮

![](https://s3.bmp.ovh/imgs/2021/12/532f8b7e2fb100c3.png)

```vue
<template>
  <div>
    <lowcode-table :data="tableData" :schema="tableSchema" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableSchema: {
        type: "table",
        body: [
          {
            name: "date",
            label: "日期",
            render: ({ value }) => {
              return value + "数据改造";
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
        ],
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
};
</script>
```

### 5. 操作列

操作列是项目中必不可少的

再加一个列配置：type 为`operation`,key: `actions`的值为 array 类型。用于指定要渲染的行为控件

eg :

```js
{
                type: "link",
                label: "详情",
                props: {
                  type: "primary",
                },
                click: (row) => {
                  // 具体逻辑
                },
              },
```

click 函数，将作为渲染出来的行为控件的点击事件处理函数。可以从其参数`row`中获取该行内的所有数据

![](https://s3.bmp.ovh/imgs/2021/12/87d7f1dd5eb85a21.png)

```vue
<template>
  <div>
    <lowcode-table :data="tableData" :schema="tableSchema" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableSchema: {
        type: "table",
        body: [
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
                label: "详情",
                props: {
                  type: "primary",
                },
                click: (row) => {
                  // 具体逻辑
                },
              },
              {
                type: "link",
                label: "编辑",
                props: {
                  type: "primary",
                },
                click: (row) => {
                  // 具体逻辑
                },
              },
            ],
          },
        ],
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
};
</script>
```

## 二：form-search

![](https://s3.bmp.ovh/imgs/2021/12/60e2679383f3f3a0.png)

```vue
<template>
  <div>
    <lowcode-form-search :schema="formSchema" dataSourceName="formData">
    </lowcode-form-search>
  </div>
</template>

<script>
import moment from "moment";
import City from "./custom/City.vue";

export default {
  data() {
    return {
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
    };
  },
};
</script>
```

### 2.1 基本使用

### 2.2 属性&事件

### 2.3 获取实例

### 2.4 自定组件

### 2.5 添加行为操作

## 三：from

![](https://s3.bmp.ovh/imgs/2021/12/0db2454950da9e42.png)

```vue
<template>
  <div class="form">
    <lowcode-form
      :model="form"
      :schema="formSchema"
      :rules="rules"
      ref="ruleForm"
      dataSourceName="form"
    />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        name: "",
        region: "",
        date: "",
        delivery: false,
        type: [],
        resource: 1,
        desc: "",
      },
      formSchema: {
        type: "form",
        props: {
          labelWidth: "100px",
        },
        body: [
          {
            type: "input",
            name: "name",
            label: "活动名称",
          },
          {
            type: "select",
            name: "region",
            label: "活动区域",
            options: [
              {
                label: "区域1",
                value: 1,
              },
              {
                label: "区域2",
                value: 2,
              },
            ],
          },
          {
            type: "date",
            name: "data",
            label: "活动时间",
          },
          {
            type: "switch",
            name: "delivery",
            label: "即时配送",
          },
          {
            type: "checkbox",
            name: "type",
            label: "活动性质",
            options: [
              {
                label: "美食/餐厅线上活动",
                name: "type",
              },
              {
                label: "地推活动",
                name: "type",
              },
              {
                label: "线下主题活动",
                name: "type",
              },
              {
                label: "单纯品牌曝光",
                name: "type",
              },
            ],
          },
          {
            type: "radio",
            name: "resource",
            label: "特殊资源",
            options: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
            ],
          },
          {
            type: "textarea",
            name: "desc",
            label: "活动形式",
          },
          {
            type: "actions",
            body: [
              {
                type: "button",
                label: "提交",
                click: () => {
                  // 提交逻辑
                  this.$refs.ruleForm.form.validate((valid) => {
                    if (valid) {
                      alert("submit!");
                    } else {
                      console.log("error submit!!");
                      return false;
                    }
                  });
                },
              },
              {
                type: "button",
                label: "取消",
                click: () => {
                  // 具体逻辑
                },
              },
            ],
          },
        ],
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
};
</script>

<style scoped>
.form {
  width: 500px;
}
</style>
```

### 3.1 基本使用

### 3.2 基础联动

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_