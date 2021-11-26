/**
 * file: 与表格配合使用的表单搜索组件封装
 */

import Vue from "vue";
import handleVnode from "../../mixins/handleVnode";
export default {
  name: "lowcode-ele-form-search",
  mixins: [handleVnode],
  props: {
    schema: {
      type: Array,
      default: () => [],
    },
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
        if (type !== "actions" && (!type || !name))
          throw new Error("formItemSchema缺少type或name");

        return this.renderFormItem(formItemSchema);
      });
    },

    /**
     * 渲染具体表单项
     * @param {*} formItemSchema
     * @returns form-item vnode
     */
    renderFormItem(formItemSchema) {
      const {
        type,
        label,
        name,
        trim = true,
        options = [],
        body = [],
        props = {},
      } = formItemSchema;
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
          return (
            <el-form-item label={label} prop={name}>
              <el-select
                vModel={this.$parent[dataSourceName][name]}
                placeholder={formItemSchema.placeholder || "请选择"}
              >
                {this.renderSelectOptions(options)}
              </el-select>
            </el-form-item>
          );
        case "select-mc":
          return null;
        case "input-time":
          return (
            <el-form-item label={label} prop={name}>
              {this.handleColVnode(
                <el-date-picker vModel={this.$parent[dataSourceName][name]} />,
                props
              )}
            </el-form-item>
          );
        case "actions":
          return <template slot="moreBtn">{this.renderActions(body)}</template>;
        default:
          if (Vue.component(type) || this.$slots[type]) {
            const customType = Vue.component(type) ? 1 : 2;
            return this.renderCustomComp(customType, formItemSchema);
          }

          return null;
      }
    },

    /**
     * 自定义组件的渲染
     * @customType {*} 自定义组件类型 1 全局注册 2 局部注册
     * @formItemSchema {*} 该表单项的具体schema
     * @returns 自定义组件的vnode
     */
    renderCustomComp(customType, formItemSchema) {
      const { type, label, name } = formItemSchema;
      // 处理全局注册的
      if (customType === 1) {
        const CustomComp = Vue.component(type);
        return <CustomComp />;
      }
      // 处理局部注册的
      if (customType === 2) {
        return (
          <el-form-item label={label} prop={name}>
            {this.$slots[type]}
          </el-form-item>
        );
      }
    },

    /**
     * 对于input value值处理，eg 去除空格
     * todo 后续计划其他
     * @param {*} val input value
     * @param {*} param1 对于val的操作方法
     * @returns val
     */
    handleInputVal(val, { trim }) {
      if (trim) {
        return val.trim();
      } else {
        return val;
      }
    },

    /**
     * select中的字选项渲染
     * @param {*} options
     * @returns all options vnode
     */
    renderSelectOptions(options) {
      return options.map((option) => {
        const { label, value } = option;
        return <el-option key={value} value={value} label={label} />;
      });
    },

    /**
     * 渲染所有的搜索表单中的所有action控件
     * @param {*} actions
     * @returns all action vnode
     */
    renderActions(actions) {
      return actions.map((action) => {
        return <el-form-item>{this.renderActionbyType(action)}</el-form-item>;
      });
    },

    /**
     * 根据type 分发渲染action
     * @param {*} action
     * @returns action vnode
     */
    renderActionbyType(action) {
      const { type, label, click } = action;
      switch (type) {
        case "button":
          return this.renderBtnAction(label, click);
        case "link":
          return this.renderLinkAction(label, click);
        default:
          return null;
      }
    },

    /**
     * 渲染button
     * @param {*} label
     * @param {*} click
     * @returns btn vnode
     */
    renderBtnAction(label, click) {
      return (
        <el-button
          type="primary"
          size="mini"
          on-click={() => {
            click.call(this.$parent);
          }}
        >
          {label}
        </el-button>
      );
    },

    /**
     * 渲染link
     * @param {*} label
     * @param {*} click
     * @returns link vnode
     */
    renderLinkAction(label, click) {
      return (
        <el-link
          type="primary"
          size="mini"
          on-click={() => {
            click.call(this.$parent);
          }}
        >
          {label}
        </el-link>
      );
    },
  },
  render: function (h) {
    return (
      <div class="app-main">
        <el-form>
          {this.handleVnodeProp(
            <BLM-search>{this.renderAllFormItem(this.schema)}</BLM-search>
          )}
        </el-form>
      </div>
    );
  },
};
