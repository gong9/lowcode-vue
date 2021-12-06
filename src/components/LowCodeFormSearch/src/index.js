/**
 * @file 表单搜索组件
 */

import Vue from "vue";
import handleVnode from "../../../mixins/handleVnode";
export default {
  name: "lowcode-form-search",
  mixins: [handleVnode],
  props: {
    schema: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    /**
     * 渲染所有表单项
     * @param {*} schema
     * @returns all form-item vnode
     */
    renderAllFormItem(schema) {
      if (!Array.isArray(schema)) throw new Error("body属性值需是array类型");

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
        body = [],
        props = {},
        render,
      } = formItemSchema;
      const { dataSourceName } = this.$attrs;

      if (!dataSourceName)
        throw new Error("dataSourceName用于数据双向绑定，必传");

      switch (type) {
        case "input":
        case "select":
          return (
            <el-form-item label={label} prop={name}>
              <lowcode-form-item schema={formItemSchema} ctx={this} />
            </el-form-item>
          );
        case "input-time":
          return (
            <el-form-item label={label} prop={name}>
              {this.handleInjectPorps(
                <el-date-picker vModel={this.$parent[dataSourceName][name]} />,
                props
              )}
            </el-form-item>
          );
        case "actions":
          return <template slot="moreBtn">{this.renderActions(body)}</template>;
        default:
          // 处理用户自定义组件
          if (Vue.component(type) || (render && typeof render === "function")) {
            const customType = Vue.component(type) ? 1 : 2;
            return this.renderCustomComp(customType, formItemSchema);
          }

          return null;
      }
    },

    /**
     * todo all lowcode comp sholud need this, so 抽离吧
     * 自定义组件的渲染
     * @customType {*} 自定义组件类型 1 全局注册 2 局部注册
     * @formItemSchema {*} 该表单项的具体schema
     * @returns 自定义组件的vnode
     */
    renderCustomComp(customType, formItemSchema) {
      const { type, label, name, render } = formItemSchema;
      const { dataSourceName } = this.$attrs;
      // 处理全局注册的
      if (customType === 1) {
        const CustomComp = Vue.component(type);
        return (
          <el-form-item label={label} prop={name}>
            <CustomComp
              value={this.$parent[dataSourceName][name]}
              on-custom-comp={(val) => {
                this.$parent[dataSourceName][name] = val;
              }}
            />
          </el-form-item>
        );
      }
      // 处理局部注册的
      if (customType === 2) {
        return (
          <el-form-item label={label} prop={name}>
            {this.handleVnodeProp(render.call(this.$parent), {
              props: {
                defaultValue: this.$parent[dataSourceName][name],
              },
              events: {
                "custom-comp": (val) => {
                  this.$parent[dataSourceName][name] = val;
                },
              },
            })}
          </el-form-item>
        );
      }
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
    const { props, body } = this.schema;
    return (
      <div class="app-main">
        <el-form>
          {this.handleVnodeProp(
            this.handleInjectPorps(
              <BLM-search>{this.renderAllFormItem(body)}</BLM-search>,
              props
            )
          )}
        </el-form>
      </div>
    );
  },
};
