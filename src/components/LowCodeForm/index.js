import handleVnode from "../../mixins/handleVnode";
export default {
  name: "lowcode-ele-form-search",
  mixins: [handleVnode],
  props: {
    data: {
      type: Object,
    },
    schema: {
      type: Array,
    },
  },
  data: function () {
    return {
      temp: {},
    };
  },
  methods: {
    /**
     * 渲染所有表单项
     * @param {*} schema
     * @returns all form-item vnode
     */
    renderAllFormItem(schema) {
      return schema.map((formItemSchema) => {
        const { type, name } = formItemSchema;
        if (!type || !name) throw new Error("formItemSchema缺少type或name");

        return this.renderFormItem(formItemSchema);
      });
    },

    /**
     * 渲染具体表单项
     * @param {*} formItemSchema
     * @returns form-item vnode
     */
    renderFormItem(formItemSchema) {
      const { type, label, name, trim = true } = formItemSchema;
      const { dataSourceName } = this.$attrs;

      if (!dataSourceName)
        throw new Error("dataSourceName用于数据双向绑定，必传");

      switch (type) {
        case "input":
          return (
            <el-form-item label={label} prop={name}>
              <el-input
                value={this.$parent[dataSourceName][name]}
                on-input={(val) => {
                  this.$parent[dataSourceName][name] = this.handleInputVal(
                    val,
                    { trim }
                  );
                }}
              />
            </el-form-item>
          );
        case "select-sc":
          return null;
        case "select-mc":
          return null;
        default:
          return null;
      }
    },

    /**
     * 对于input value值处理，eg 去除空格
     * @param {*} val input value
     * @param {*} param1 对于
     * @returns val
     */
    handleInputVal(val, { trim }) {
      if (trim) {
        return val.trim();
      } else {
        return val;
      }
    },
  },
  render: function (h) {
    return (
      <div class="app-main">
        <el-form>
          <BLM-search>{this.renderAllFormItem(this.schema)}</BLM-search>
        </el-form>
      </div>
    );
  },
};
