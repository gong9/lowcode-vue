<template>
  <div>
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
        resource: "",
        desc: "",
      },
      formSchema: [
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
          visible: () => {
            return this.form.delivery === true;
          },
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
              label: 1,
            },
            {
              label: 2,
            },
          ],
        },
        {
          type: "textarea",
          name: "desc",
          label: "活动形式",
          // 优化代码，逻辑暂时没处理
          disabled: () => {
            return this.form.resource === 1;
          },
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
