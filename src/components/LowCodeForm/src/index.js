/**
 * file: 表格组件封装
 * todo 思考基础的表单控件需不需要写在此文件中 --都抽出去
 * todo 思考几种常见的组件联动关系 基础联动文件中仅需提供对应显示隐藏、可用不可用逻辑即可
 */

import handleVnode from "../../../mixins/handleVnode";
export default {
  name: "lowcode-form",
  mixins: [handleVnode],
  props: {
    data: {
      type: Object,
    },
    schema: {
      type: Array,
    },
    rules: {
      type: Object,
    },
  },
  data: function () {
    return {
      form: null, // 用于存储el-form实例
    };
  },
  methods: {
    /**
     * 渲染全部表单项
     * @param {array} schema
     * @returns
     */
    renderAllFormItem(schema) {
      return schema.map((formItemSchema) => {
        return this.renderFormItem(formItemSchema);
      });
    },

    /**
     * 判断是否渲染某一表单项
     * @param {array} handles
     */
    isRenderNode(handles) {
      if (Array.isArray(handles)) {
        handles.map((handle) => {
          if (typeof handle === "function") return handle.call();
          if (typeof handle === "boolean") return handle;
        });
      }
    },

    /**
     * 渲染具体表单项
     * @param {object} formItemSchema
     * @return vnode
     */
    renderFormItem(formItemSchema) {
      const { dataSourceName } = this.$attrs;
      const { label, name, type, visible, disabled } = formItemSchema;

      // this.isRenderNode([visible, disabled]);

      let formItemVnode = null;
      switch (type) {
        case "input":
        case "select":
        case "switch":
        case "checkbox":
          formItemVnode = (
            <lowcode-form-item
              schema={formItemSchema}
              dataSourceName={dataSourceName}
              ctx={this}
            />
          );
          break;
        case "date":
          return null;
        case "radio":
          formItemVnode = this.renderRadio(formItemSchema, dataSourceName);
          break;
        case "textarea":
          formItemVnode = this.renderTextarea(formItemSchema, dataSourceName);
          break;
        case "actions":
          formItemVnode = this.renderActions(formItemSchema);
          break;
        default:
          formItemVnode = null;
          break;
      }
      return (
        formItemVnode && (
          <el-form-item label={label} prop={name}>
            {formItemVnode}
          </el-form-item>
        )
      );
    },
    renderDatePicker() {},
    renderRadio(formItemSchema, dataSourceName) {
      const { name, label, options } = formItemSchema;
      return (
        <el-radio-group vModel={this.$parent[dataSourceName][name]}>
          {this.renderRadioItem(options)}
        </el-radio-group>
      );
    },
    renderRadioItem(options) {
      return options.map((radio) => {
        const { label } = radio;
        return <el-radio label={label}></el-radio>;
      });
    },
    renderTextarea(formItemSchema, dataSourceName) {
      const { name, label } = formItemSchema;
      return (
        <el-input
          type="textarea"
          vModel={this.$parent[dataSourceName][name]}
        ></el-input>
      );
    },
    renderActions(formItemSchema) {
      const { body } = formItemSchema;

      if (body && Array.isArray(body)) {
        return (
          <el-form-item>
            {body.map((action) => {
              return this.renderAction(action);
            })}
          </el-form-item>
        );
      }
    },
    renderAction(action) {
      const { type } = action;
      switch (type) {
        case "button":
          return this.renderBtn(action);

        default:
          break;
      }
    },
    renderBtn(action) {
      const { label, click = () => {} } = action;
      return (
        <el-button
          type="primary"
          on-click={() => {
            click.call(this.$parent);
          }}
        >
          {label}
        </el-button>
      );
    },
  },
  mounted() {
    this.form = this.$refs.form;
  },
  render: function (h) {
    return (
      <div>
        {this.handleVnodeProp(
          <el-form rules={this.rules} ref="form" label-width="80px">
            {this.renderAllFormItem(this.schema)}
          </el-form>
        )}
      </div>
    );
  },
};
