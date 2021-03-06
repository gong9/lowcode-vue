/**
 * @file 表单组件
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
      return schema.map((formItemSchema, index) => {
        return this.renderFormItem(formItemSchema, index);
      });
    },

    /**
     * 判断是否渲染某一表单项
     * @param {array} handles
     */
    isRenderNode(handleFn) {
      if (typeof handleFn !== "function")
        throw new Error("disabled配置项需是一个函数");
      return handleFn.call(this.$parent);
    },

    /**
     * 当前控件是否可用
     * @param {function} handleFn
     * @returns boolear
     */
    isDisabled(handleFn) {
      if (typeof handleFn !== "function")
        throw new Error("visible配置项需是一个函数");
      return handleFn.call(this.$parent);
    },

    /**
     * 渲染具体表单项
     * @param {object} formItemSchema
     * @return vnode
     */
    renderFormItem(formItemSchema, index) {
      const { dataSourceName } = this.$attrs;
      const { label, name, type, visible, disabled } = formItemSchema;

      const configProps = {
        disabled: disabled ? this.isDisabled(disabled) : false,
      };
      let formItemVnode = null;

      if (visible && !this.isRenderNode(visible)) {
        return null;
      }
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
              configProps={{ ...configProps }}
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
      return formItemVnode ? (
        <el-form-item label={label} prop={name} key={index}>
          {formItemVnode}
        </el-form-item>
      ) : null;
    },

    /**
     * 渲染all行为组件
     * @param {object} formItemSchema
     * @returns vnode
     */
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

    /**
     * 根据行为组件type 分发不同渲染逻辑
     * @param {object} formItemSchema
     * @returns vnode
     */
    renderAction(action) {
      const { type } = action;
      switch (type) {
        case "button":
          return this.renderBtn(action);
        default:
          break;
      }
    },

    /**
     * 渲染按钮
     * @param {object} action
     * @returns btn vnode
     */
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
