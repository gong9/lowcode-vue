/**
 * file: 表格组件封装
 * todo 思考基础的表单控件需不需要写在此文件中
 * todo 思考几种常见的组件联动关系
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
  },
  data: function () {
    return {
      form: null,
    };
  },
  methods: {
    renderAllFormItem(schema) {
      return schema.map((formItemSchema) => {
        return this.renderFormItem(formItemSchema);
      });
    },
    renderFormItem(formItemSchema) {
      const { dataSourceName } = this.$attrs;
      const { type } = formItemSchema;
      switch (type) {
        case "input":
          return this.renderInput(formItemSchema, dataSourceName);
        case "select":
          return this.renderSelect(formItemSchema, dataSourceName);
        case "date":
          return null;
        case "switch":
          return this.renderSwitch(formItemSchema, dataSourceName);
        case "checkbox":
          return this.renderCheckbox(formItemSchema, dataSourceName);
        case "radio":
          return this.renderRadio(formItemSchema, dataSourceName);
        case "textarea":
          return this.renderTextarea(formItemSchema, dataSourceName);
        case "actions":
          return this.renderActions(formItemSchema);
        default:
          break;
      }
    },
    renderInput(formItemSchem, dataSourceName) {
      const { name, label } = formItemSchem;
      return (
        <el-form-item label={label}>
          <el-input vModel={this.$parent[dataSourceName][name]}></el-input>
        </el-form-item>
      );
    },
    renderSelect(formItemSchema, dataSourceName) {
      const { name, label, options = [] } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-select
            vModel={this.$parent[dataSourceName][name]}
            placeholder="请选择活动区域"
          >
            {this.renderOptions(options)}
          </el-select>
        </el-form-item>
      );
    },
    renderOptions(options) {
      return options.map((option) => {
        const { label, value } = option;
        return <el-option label={label} value={value}></el-option>;
      });
    },
    renderDatePicker() {},
    renderSwitch(formItemSchema, dataSourceName) {
      const { name, label } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-switch vModel={this.$parent[dataSourceName][name]}></el-switch>
        </el-form-item>
      );
    },
    renderCheckbox(formItemSchema, dataSourceName) {
      const { label, name, options = [] } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-checkbox-group vModel={this.$parent[dataSourceName][name]}>
            {this.renderCheckboxItem(options)}
          </el-checkbox-group>
        </el-form-item>
      );
    },
    renderCheckboxItem(allCheckbox) {
      return allCheckbox.map((checkboc) => {
        const { label, value } = checkboc;
        return <el-checkbox label={label} value={value}></el-checkbox>;
      });
    },
    renderRadio(formItemSchema, dataSourceName) {
      const { name, label, options } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-radio-group vModel={this.$parent[dataSourceName][name]}>
            {this.renderRadioItem(options)}
          </el-radio-group>
        </el-form-item>
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
        <el-form-item label={label}>
          <el-input
            type="textarea"
            vModel={this.$parent[dataSourceName][name]}
          ></el-input>
        </el-form-item>
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
          <el-form ref="form" label-width="80px">
            {this.renderAllFormItem(this.schema)}
          </el-form>
        )}
      </div>
    );
  },
};
