<template>
  <div>
    <LowCodeForm :model="form" :schema="formSchema" />
  </div>
</template>

<script>
import LowCodeForm from "../components/LowCodeForm";
export default {
  components: {
    LowCodeForm,
  },
  data: function () {
    return {
      form: {
        name: "",
        region: "",
        date: "",
        delivery: "",
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
              label: "线上品牌商赞助",
            },
            {
              label: "线下场地免费",
            },
          ],
        },
        {
          type: "textarea",
          name: "desc",
          label: "活动形式",
        },
      ],
    };
  },
};
</script>
