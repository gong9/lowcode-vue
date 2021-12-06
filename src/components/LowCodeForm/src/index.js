/**
 * @file 表单组件封装
 */

import handleVnode from "../../../mixins/handleVnode";
export default {
  name: "lowcode-form",
  mixins: [handleVnode],
  props: {
    schema: {
      type: Object,
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
        case "radio":
        case "textarea":
          formItemVnode = (
            <lowcode-form-item
              schema={formItemSchema}
              dataSourceName={dataSourceName}
              ctx={this}
            />
          );
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
    const { props = {}, body } = this.schema;
    return (
      <div>
        {this.handleVnodeProp(
          this.handleInjectPorps(
            <el-form rules={this.rules} ref="form">
              {this.renderAllFormItem(body)}
            </el-form>,
            props
          )
        )}
      </div>
    );
  },
};
