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
        case "actions":
          return <template slot="moreBtn">{this.renderActions(body)}</template>;
        default:
          // 处理局部注册的
          if (typeof type === "object") return this.renderCustomComp(type);

          // 处理全局注册的
          if (Vue.component(type)) {
            const CustomComp = Vue.component(type);
            return <CustomComp />;
          }
          return null;
      }
    },

    /**
     * 自定义组件的渲染
     * todo 未完成，思路不对
     * @param {*} type
     * @returns 自定义组件的vnode
     */
    renderCustomComp(type) {
      const vnode = new Vue(type).$mount().$createElement();
      return null;
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
        return <el-option key={value} value={value} label={label}></el-option>;
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
